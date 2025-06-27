<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProductController extends Controller
{
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

            return $product;
        });

        return Inertia::render('Products/Index', [
            'products' => $products
        ]);
    }

    public function create()
    {
        return Inertia::render('Products/Create', [
            'brands' => Brand::select('id', 'name')->get(),
            'categories' => Category::with('children')->whereNull('parent_id')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'short_description' => 'nullable|string|max:255',
            'sku' => 'nullable|string|max:100',
            'barcode' => 'nullable|string|max:100',
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
            'weight' => 'nullable|numeric',
            'dimensions' => 'nullable|string|max:255',
            'category_ids' => 'array',
            'category_ids.*' => 'exists:categories,id',
            'main_image' => 'nullable|image|max:2048',
            'gallery.*' => 'nullable|image|max:2048',
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
            'description' => 'nullable|string',
            'short_description' => 'nullable|string|max:255',
            'sku' => 'nullable|string|max:100',
            'barcode' => 'nullable|string|max:100',
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
            'weight' => 'nullable|numeric',
            'dimensions' => 'nullable|string|max:255',
            'category_ids' => 'array',
            'category_ids.*' => 'exists:categories,id',
            'main_image' => 'nullable|image|max:2048',
            'gallery.*' => 'nullable|image|max:2048',
        ]);

        $product->update($data);

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
}
