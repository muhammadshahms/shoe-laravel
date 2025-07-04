<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class BrandController extends Controller
{
    public function index()
    {
        $brands = Brand::latest()->paginate(10);

        return Inertia::render('Brands/Index', [
            'brands' => $brands
        ]);
    }

    public function create()
    {
        return Inertia::render('Brands/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:brands,name',
            'description' => 'nullable|string',
            'website' => 'nullable|url',
            'position' => 'nullable|integer',
            'is_active' => 'boolean',
            'logo' => 'nullable|image|max:2048',
        ]);

        $brand = Brand::create($validated);

        if ($request->hasFile('logo')) {
            $brand->addMediaFromRequest('logo')->toMediaCollection('logo');
        }

        return redirect()->route('brands.index')->with('success', 'Brand created successfully.');
    }

    public function show(Brand $brand)
    {
        return Inertia::render('Brands/Show', [
            'brand' => $brand->load('products')
        ]);
    }

    public function edit(Brand $brand)
    {
        return Inertia::render('Brands/Edit', [
            'brand' => $brand
        ]);
    }

    public function update(Request $request, Brand $brand)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:brands,name,' . $brand->id,
            'description' => 'nullable|string',
            'website' => 'nullable|url',
            'position' => 'nullable|integer',
            'is_active' => 'boolean',
            'logo' => 'nullable|image|max:2048',
        ]);

        $brand->update($validated);

        if ($request->hasFile('logo')) {
            $brand->clearMediaCollection('logo');
            $brand->addMediaFromRequest('logo')->toMediaCollection('logo');
        }

        return redirect()->route('brands.index')->with('success', 'Brand updated successfully.');
    }

    public function destroy(Brand $brand)
    {
        $brand->delete();

        return redirect()->route('brands.index')->with('success', 'Brand deleted.');
    }
}
