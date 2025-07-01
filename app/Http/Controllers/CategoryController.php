<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
class CategoryController extends Controller
{
    /**
     * Display a listing of categories.
     */
    public function index()
    {
        $categories = Category::with(['parent', 'media'])
            ->orderBy('position')
            ->get()
            ->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'description' => $category->description,
                    'parent_id' => $category->parent_id,
                    'position' => $category->position,
                    'is_active' => $category->is_active,
                    'parent' => $category->parent,
                    'image_url' => $category->getFirstMediaUrl('banner'),
                    'created_at' => $category->created_at,
                    'updated_at' => $category->updated_at,
                ];
            });

        return Inertia::render('Categories/Index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new category.
     */
    public function create()
    {
        // Only parent (top-level) categories shown for assignment
        $parents = Category::whereNull('parent_id')->get();

        return Inertia::render('Categories/Create', [
            'parents' => $parents,
        ]);
    }

    /**
     * Store a newly created category.
     */
    public function store(Request $request)
    {
        // // Debug: Let's see what we're receiving
        // \Log::info('Request data:', ['data' => $request->all()]);
        // \Log::info('Has file:', ['has_file' => $request->hasFile('image')]);
        // \Log::info('Files:', ['files' => $request->allFiles()]);
        // Convert string boolean to actual boolean for validation
        $data = $request->all();
        if (isset($data['is_active'])) {
            $data['is_active'] = filter_var($data['is_active'], FILTER_VALIDATE_BOOLEAN);
        }

        // Handle parent_id - convert empty string to null
        if (isset($data['parent_id']) && ($data['parent_id'] === '' || $data['parent_id'] === '0')) {
            $data['parent_id'] = null;
        }

        $validated = validator($data, [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'parent_id' => 'nullable|exists:categories,id',
            'position' => 'nullable|integer',
            'is_active' => 'required|boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ])->validate();

        $category = Category::create($validated);

        // Handle image upload
        if ($request->hasFile('image')) {
            $category->addMediaFromRequest('image')
                ->toMediaCollection('banner');
        }

        return redirect()
            ->route('categories.index')
            ->with('success', 'Category created successfully.');
    }

    /**
     * Display the specified category.
     */
    public function show(Category $category)
    {
        $category->load(['parent', 'children', 'media']);

        return Inertia::render('Categories/Show', [
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'description' => $category->description,
                'parent_id' => $category->parent_id,
                'position' => $category->position,
                'is_active' => $category->is_active,
                'parent' => $category->parent,
                'children' => $category->children,
                'image_url' => $category->getFirstMediaUrl('banner'),
                'created_at' => $category->created_at,
                'updated_at' => $category->updated_at,
            ],
        ]);
    }

    /**
     * Show the form for editing the specified category.
     */
    public function edit(Category $category)
    {
        // Prevent selecting itself as parent
        $parents = Category::whereNull('parent_id')
            ->where('id', '!=', $category->id)
            ->get();

        return Inertia::render('Categories/Edit', [
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'description' => $category->description,
                'parent_id' => $category->parent_id,
                'position' => $category->position,
                'is_active' => $category->is_active,
                'image_url' => $category->getFirstMediaUrl('banner'),
            ],
            'parents' => $parents,
        ]);
    }

    /**
     * Update the specified category.
     */
    public function update(Request $request, Category $category)
    {// Add this right at the beginning of the store method

        // Convert string boolean to actual boolean for validation
        $data = $request->all();
        if (isset($data['is_active'])) {
            $data['is_active'] = filter_var($data['is_active'], FILTER_VALIDATE_BOOLEAN);
        }

        if (isset($data['remove_image'])) {
            $data['remove_image'] = filter_var($data['remove_image'], FILTER_VALIDATE_BOOLEAN);
        }

        // Handle parent_id - convert empty string to null
        if (isset($data['parent_id']) && ($data['parent_id'] === '' || $data['parent_id'] === '0')) {
            $data['parent_id'] = null;
        }

        $validated = validator($data, [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'parent_id' => 'nullable|exists:categories,id',
            'position' => 'nullable|integer',
            'is_active' => 'required|boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'remove_image' => 'nullable|boolean',
        ])->validate();

        $category->update($validated);

        // Handle image removal
        if ($request->boolean('remove_image')) {
            $category->clearMediaCollection('banner');
        }
        // Handle new image upload
        elseif ($request->hasFile('image')) {
            $category->clearMediaCollection('banner');
            $category->addMediaFromRequest('image')
                ->toMediaCollection('banner');
        }

        return redirect()
            ->route('categories.index')
            ->with('success', 'Category updated successfully.');
    }

    /**
     * Remove the specified category.
     */
    public function destroy(Category $category)
    {
        // Clear media before deleting
        $category->clearMediaCollection('banner');
        $category->delete();

        return redirect()
            ->route('categories.index')
            ->with('success', 'Category deleted successfully.');
    }

    /**
     * Display categories in tree format.
     */
    public function tree()
    {
        $categories = Category::with(['parent', 'media'])
            ->orderBy('position')
            ->get()
            ->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'description' => $category->description,
                    'parent_id' => $category->parent_id,
                    'position' => $category->position,
                    'is_active' => $category->is_active,
                    'parent' => $category->parent,
                    'image_url' => $category->getFirstMediaUrl('banner'),
                ];
            });

        return Inertia::render('Categories/Tree', [
            'categories' => $categories,
        ]);
    }

    /**
     * Remove category image.
     */
    public function removeImage(Category $category)
    {
        $category->clearMediaCollection('banner');
        return back()->with('success', 'Category image removed successfully.');
    }
}
