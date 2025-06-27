<?php

namespace App\Http\Controllers;

use App\Models\ProductVariation;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductVariationController extends Controller
{
    public function index()
    {
        $variations = ProductVariation::with('product')->latest()->paginate(10);
        return inertia('ProductVariation/Index', [
            'variations' => $variations
        ]);
    }

    public function create()
    {
        $products = Product::all(); 
        return inertia('ProductVariation/Create', [
            'products' => $products
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'sku' => 'required|string',
            'barcode' => 'nullable|string',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'in_stock' => 'boolean',
            'attributes' => 'nullable|array',
        ]);

        ProductVariation::create($validated);

        return redirect()->route('product-variations.index')->with('success', 'Variation created successfully.');
    }

    public function edit(ProductVariation $productVariation)
    {
        $products = Product::all();
        return inertia('ProductVariation/Edit', [
            'variation' => $productVariation,
            'products' => $products
        ]);
    }

    public function update(Request $request, ProductVariation $productVariation)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'sku' => 'required|string',
            'barcode' => 'nullable|string',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'in_stock' => 'boolean',
            'attributes' => 'nullable|array',
        ]);

        $productVariation->update($validated);

        return redirect()->route('product-variations.index')->with('success', 'Variation updated successfully.');
    }

    public function destroy(ProductVariation $productVariation)
    {
        $productVariation->delete();
        return redirect()->route('product-variations.index')->with('success', 'Variation deleted successfully.');
    }
}
