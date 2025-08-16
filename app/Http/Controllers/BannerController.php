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
        // $this->authorizeResource(Banner::class, 'banner');
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
            'type' => ['required', Rule::in(['slider', 'banner'])],
            'is_active' => 'boolean',
            'banner_image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $bannerImage = $data['banner_image'] ?? null;
        unset($data['banner_image']);

        // agar is_active true hai to baaki sab ko deactivate kar do
        if (!empty($data['is_active']) && $data['is_active'] == true && $data['type'] === 'banner') {
            Banner::where('type', 'banner')
                ->where('is_active', true)
                ->update(['is_active' => false]);
        }

        $banner = Banner::create($data);

        if ($bannerImage) {
            $banner->addMediaFromRequest('banner_image')->toMediaCollection('banner');
        }

        return redirect()->route('banners.index')
            ->with('success', 'Banner created successfully.');
    }

    public function update(Request $request, Banner $banner)
    {
        $data = $request->validate([
            'title' => 'required|string|min:3|max:255',
            'description' => 'nullable|string|max:1000',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'type' => ['required', Rule::in(['slider', 'banner'])],
            'is_active' => 'sometimes|boolean',
            'banner_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $bannerImage = $data['banner_image'] ?? null;
        unset($data['banner_image']);

        // agar is_active true set karna hai to baaki sab ko deactivate kar do
        if (!empty($data['is_active']) && $data['is_active'] == true && $data['type'] === 'banner') {
            Banner::where('type', 'banner')
                ->where('id', '!=', $banner->id)
                ->update(['is_active' => false]);
        }

        $banner->update($data);

        if ($bannerImage) {
            $banner->clearMediaCollection('banner');
            $banner->addMediaFromRequest('banner_image')->toMediaCollection('banner');
        }

        return redirect()->route('banners.index')
            ->with('success', 'Banner updated successfully.');
    }

}
