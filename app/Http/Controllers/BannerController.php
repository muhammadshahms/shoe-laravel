<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class BannerController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Banner::class, 'banner');
    }

    /**
     * Display a listing of banners.
     */
    public function index(Request $request)
    {
        $query = Banner::query();

        // Search filter by title or type
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('type', 'like', "%{$search}%");
            });
        }

        // Pagination (10 per page)
        $banners = $query->latest()->paginate(10)->withQueryString();
        dd($banners);
        return Inertia::render('Banners/Index', [
            'banners' => $banners,
            'filters' => $request->only('search'),
        ]);
    }

    /**
     * Show the form for creating a new banner.
     */
    public function create()
    {
        return Inertia::render('Banners/Create');
    }

    /**
     * Store a newly created banner.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|min:3|max:255',
            'description' => 'nullable|string|max:1000',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'type' => ['required', Rule::in(['promo', 'info', 'other'])],
            'is_active' => 'boolean',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        // Remove image from mass assignment
        $image = $data['image'] ?? null;
        unset($data['image']);

        $banner = Banner::create($data);

        if ($image) {
            $banner->addMediaFromRequest('image')->toMediaCollection('banner');
        }

        return redirect()->route('banners.index')
            ->with('success', 'Banner created successfully.');
    }

    /**
     * Show the form for editing the banner.
     */
    public function edit(Banner $banner)
    {
        return Inertia::render('Banners/Edit', [
            'banner' => $banner->toArray(),
            'banner_image' => $banner->getFirstMediaUrl('banner', 'web') ?: '/images/default-banner.png',
        ]);
    }

    /**
     * Update the specified banner.
     */
    public function update(Request $request, Banner $banner)
    {
        $data = $request->validate([
            'title' => 'required|string|min:3|max:255',
            'description' => 'nullable|string|max:1000',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'type' => ['required', Rule::in(['promo', 'info', 'other'])],
            'is_active' => 'sometimes|boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        // Remove image from mass assignment
        $image = $data['image'] ?? null;
        unset($data['image']);

        $banner->update($data);

        if ($image) {
            $banner->clearMediaCollection('banner');
            $banner->addMediaFromRequest('image')->toMediaCollection('banner');
        }

        return redirect()->route('banners.index')
            ->with('success', 'Banner updated successfully.');
    }

    /**
     * Remove the specified banner.
     */
    public function destroy(Banner $banner)
    {
        $banner->clearMediaCollection('banner');
        $banner->delete();

        return redirect()->route('banners.index')
            ->with('success', 'Banner deleted successfully.');
    }
}
