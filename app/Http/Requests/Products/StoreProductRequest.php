<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:products,slug|max:255',
            'description' => 'nullable|string',
            'short_description' => 'nullable|string',
            'sku' => 'nullable|string|max:100',
            'barcode' => 'nullable|string|max:100',
            'brand_id' => 'nullable|exists:brands,id',
            'price' => 'required|numeric|min:0',
            'special_price' => 'nullable|numeric|min:0',
            'special_price_start' => 'nullable|date',
            'special_price_end' => 'nullable|date|after_or_equal:special_price_start',
            'quantity' => 'required|integer|min:0',
            'in_stock' => 'boolean',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'weight' => 'nullable|string|max:50',
            'dimensions' => 'nullable|string|max:50',
        ];
    }
}
