<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductVariation;
use Illuminate\Http\Request;

class ProductVariationController extends Controller
{
    public function index()
    {
        $variations = ProductVariation::with('product', 'attributeOptions.attribute')->latest()->paginate(10);
        $variations->load('attributeOptions.attribute');
        // Load attribute options for each variation
        foreach ($variations as $variation) {
            $variation->attributeOptions->load('attribute');
        }

        return inertia('ProductVariation/Index', [
            'variations' => $variations,
        ]);
    }

    public function create()
    {
        $products = Product::all();
        $attributes = \App\Models\Attribute::with('options')->get();

        return inertia('ProductVariation/Create', [
            'products' => $products,
            'attributes' => $attributes,
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
            'attribute_option_ids' => 'nullable|array',
            'attribute_option_ids.*' => 'exists:attribute_options,id',
        ]);

        $variation = ProductVariation::create([
            'product_id' => $validated['product_id'],
            'sku' => $validated['sku'],
            'barcode' => $validated['barcode'] ?? null,
            'price' => $validated['price'],
            'quantity' => $validated['quantity'],
            'in_stock' => $validated['in_stock'] ?? false,
        ]);

        if (!empty($validated['attribute_option_ids'])) {
            $variation->attributeOptions()->sync($validated['attribute_option_ids']);
        }

        return redirect()->route('product-variations.index')->with('success', 'Product variation created successfully.');
    }

    public function edit(ProductVariation $productVariation)
    {
        $products = Product::all();
        $attributes = \App\Models\Attribute::with('options')->get();
        $productVariation->load('attributeOptions');

        return inertia('ProductVariation/Edit', [
            'variation' => $productVariation,
            'products' => $products,
            'attributes' => $attributes,
            'selectedOptionIds' => $productVariation->attributeOptions->pluck('id'),
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
            'attribute_option_ids' => 'nullable|array',
            'attribute_option_ids.*' => 'exists:attribute_options,id',
        ]);

        $productVariation->update([
            'product_id' => $validated['product_id'],
            'sku' => $validated['sku'],
            'barcode' => $validated['barcode'] ?? null,
            'price' => $validated['price'],
            'quantity' => $validated['quantity'],
            'in_stock' => $validated['in_stock'] ?? false,
        ]);

        // Sync attribute options
        $productVariation->attributeOptions()->sync($validated['attribute_option_ids'] ?? []);

        return redirect()->route('product-variations.index')->with('success', 'Product variation updated successfully.');
    }

    public function show(ProductVariation $productVariation)
    {
        $productVariation->load('product', 'attributeOptions.attribute');

        return inertia('ProductVariation/Show', [
            'variation' => $productVariation,
        ]);
    }

    public function destroy(ProductVariation $productVariation)
    {
        $productVariation->attributeOptions()->detach();
        $productVariation->delete();

        return redirect()->route('product-variations.index')->with('success', 'Product variation deleted successfully.');
    }
}
