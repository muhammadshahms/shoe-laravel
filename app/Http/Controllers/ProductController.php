<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function __construct()
    {
    }

    public function index()
    {
        $products = Product::with(['brand', 'categories.parent'])
            ->latest()
            ->paginate(10);

        $products->getCollection()->transform(function ($product) {
            $product->categories_list = $product->categories->map(function ($category) {
                return $category->parent
                    ? $category->parent->name . ' > ' . $category->name
                    : $category->name;
            })->implode(', ');

            // ✅ Add main_image_url
            $product->main_image_url = $product->getFirstMediaUrl('main_image');

            return $product;
        });

        return Inertia::render('Products/Index', [
            'products' => $products,
        ]);
    }

    public function create()
    {
        return Inertia::render('Products/Create', [
            'brands' => Brand::select('id', 'name')->get(),
            'categories' => Category::with('children')->whereNull('parent_id')->get(),
            'main_image_url' => null,
            'gallery_urls' => [],
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:products,slug',
            'description' => 'nullable|string',
            'short_description' => 'nullable|string',

            'sku' => 'nullable|string|max:255',
            'barcode' => 'nullable|string|max:255',

            'brand_id' => 'nullable|exists:brands,id',

            'price' => 'required|numeric|min:0',
            'special_price' => 'nullable|numeric|min:0',
            'special_price_start' => 'nullable|date',
            'special_price_end' => 'nullable|date',

            'quantity' => 'required|integer|min:0',
            'in_stock' => 'boolean',

            'is_active' => 'boolean',
            'is_featured' => 'boolean',

            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',

            'weight' => 'nullable|string|max:255',
            'dimensions' => 'nullable|string|max:255',

            'category_ids' => 'sometimes|array',
            'category_ids.*' => 'exists:categories,id',

            'main_image' => 'nullable|image|max:2048',
            'gallery.*' => 'nullable|image|max:2048',
            'gallery' => ['nullable', 'array', 'max:8'],

            'removedMainImage' => 'nullable|boolean',
            'removedGalleryIndexes' => 'nullable|array',
            'removedGalleryIndexes.*' => 'integer',
        ]);


        $product = Product::create($data);

        if ($request->hasFile('main_image')) {
            $product->addMediaFromRequest('main_image')->toMediaCollection('main_image');
        }

        if ($request->hasFile('gallery')) {
            foreach ($request->file('gallery') as $image) {
                $product->addMedia($image)->toMediaCollection('gallery');
            }
        }

        $product->categories()->sync($data['category_ids'] ?? []);

        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }

    public function edit(Product $product)
    {
        return Inertia::render('Products/Edit', [
            'product' => $product->load(['brand', 'categories']),
            'brands' => Brand::select('id', 'name')->get(),
            'categories' => Category::with('children')->whereNull('parent_id')->get(),
            'main_image_url' => $product->getFirstMediaUrl('main_image'),
            'gallery_urls' => $product->getMedia('gallery')->map->getUrl(),
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:products,slug',
            'description' => 'nullable|string',
            'short_description' => 'nullable|string',

            'sku' => 'nullable|string|max:255',
            'barcode' => 'nullable|string|max:255',

            'brand_id' => 'nullable|exists:brands,id',

            'price' => 'required|numeric|min:0',
            'special_price' => 'nullable|numeric|min:0',
            'special_price_start' => 'nullable|date',
            'special_price_end' => 'nullable|date',

            'quantity' => 'required|integer|min:0',
            'in_stock' => 'boolean',

            'is_active' => 'boolean',
            'is_featured' => 'boolean',

            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',

            'weight' => 'nullable|string|max:255',
            'dimensions' => 'nullable|string|max:255',

            'category_ids' => 'sometimes|array',
            'category_ids.*' => 'exists:categories,id',

            'main_image' => 'nullable|image|max:2048',
            'gallery.*' => 'nullable|image|max:2048',
            'gallery' => ['nullable', 'array', 'max:8'],

            'removedMainImage' => 'nullable|boolean',
            'removedGalleryIndexes' => 'nullable|array',
            'removedGalleryIndexes.*' => 'integer',
        ]);


        $product->update($data);

        // 🔥 Remove old images based on frontend flags
        if ($request->boolean('removedMainImage')) {
            $product->clearMediaCollection('main_image');
        }

        if ($request->filled('removedGalleryIndexes')) {
            $galleryMedia = $product->getMedia('gallery');
            foreach ($request->removedGalleryIndexes as $index) {
                if (isset($galleryMedia[$index])) {
                    $galleryMedia[$index]->delete();
                }
            }
        }

        // 🔄 Upload new images
        if ($request->hasFile('main_image')) {
            $product->clearMediaCollection('main_image');
            $product->addMediaFromRequest('main_image')->toMediaCollection('main_image');
        }

        if ($request->hasFile('gallery')) {
            $product->clearMediaCollection('gallery');
            foreach ($request->file('gallery') as $image) {
                $product->addMedia($image)->toMediaCollection('gallery');
            }
        }

        // Sync categories
        $product->categories()->sync($data['category_ids'] ?? []);

        return redirect()->route('products.index')->with('success', 'Product updated successfully.');
    }

    // ✅ Soft delete single product
    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->back()->with('success', 'Product deleted.');
    }

    // ✅ Bulk soft delete
    public function bulkDelete(Request $request)
    {
        $request->validate([
            'slugs' => 'required|array',
            'slugs.*' => 'string|exists:products,slug',
        ]);

        Product::whereIn('slug', $request->slugs)->delete();

        return redirect()->back()->with('success', 'Selected products deleted.');
    }

    public function show(Product $product)
    {
        return Inertia::render('Products/Show', [
            'product' => $product->load(['brand', 'categories']),
            'main_image_url' => $product->getFirstMediaUrl('main_image'),
            'gallery_urls' => $product->getMedia('gallery')->map->getUrl(),
        ]);
    }

    public function shop(Request $request)
    {
        $query = Product::with(['brand', 'categories.parent'])
            ->where('is_active', true);

        // Apply filters from request
        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('short_description', 'like', "%{$search}%");
            });
        }

        if ($request->has('category') && $request->get('category') !== 'All') {
            $category = $request->get('category');
            $query->whereHas('categories', function ($q) use ($category) {
                $q->where('name', 'like', "%{$category}%")
                    ->orWhereHas('parent', function ($q2) use ($category) {
                        $q2->where('name', 'like', "%{$category}%");
                    });
            });
        }

        if ($request->has('brand') && $request->get('brand') !== 'All') {
            $brandName = $request->get('brand');
            $query->whereHas('brand', function ($q) use ($brandName) {
                $q->where('name', $brandName);
            });
        }

        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->get('min_price'));
        }

        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->get('max_price'));
        }

        if ($request->has('on_sale') && $request->get('on_sale')) {
            $query->whereNotNull('special_price')
                ->where('special_price_start', '<=', now())
                ->where('special_price_end', '>=', now());
        }

        if ($request->has('featured') && $request->get('featured')) {
            $query->where('is_featured', true);
        }

        if ($request->has('in_stock') && $request->get('in_stock')) {
            $query->where('in_stock', true);
        }

        // Apply sorting
        $sortBy = $request->get('sort', 'featured');
        switch ($sortBy) {
            case 'price-low':
                $query->orderBy('price', 'asc');
                break;
            case 'price-high':
                $query->orderBy('price', 'desc');
                break;
            case 'newest':
                $query->latest();
                break;
            case 'name':
                $query->orderBy('name', 'asc');
                break;
            case 'featured':
            default:
                $query->orderBy('is_featured', 'desc')->latest();
                break;
        }

        $products = $query->paginate(12);

        // Transform products
        $products->getCollection()->transform(function ($product) {
            $product->categories_list = $product->categories->map(function ($category) {
                return $category->parent
                    ? $category->parent->name . ' > ' . $category->name
                    : $category->name;
            })->implode(', ');

            $product->main_image_url = $product->getFirstMediaUrl('main_image') ?: '/images/default-product.png';

            return $product;
        });

        // Get all brands and categories for filters
        $brands = Brand::orderBy('name')->get();
        $categories = Category::whereNull('parent_id')->with('children')->orderBy('name')->get();

        return Inertia::render('Shop/Index', [
            'products' => $products,
            'brands' => $brands,
            'categories' => $categories->pluck('name'),
            'filters' => $request->only(['search', 'category', 'brand', 'min_price', 'max_price', 'on_sale', 'featured', 'in_stock', 'sort'])
        ]);
    }
}
