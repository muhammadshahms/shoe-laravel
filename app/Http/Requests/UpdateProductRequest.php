<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'short_description' => 'nullable|string|max:255',
            'sku' => 'nullable|string|max:100',
            'barcode' => 'nullable|string|max:100',
            'brand_slug' => 'nullable|exists:brands,slug',
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
            'weight' => 'nullable|numeric',
            'dimensions' => 'nullable|string|max:255',
            'category_slugs' => 'array',
            'category_slugs.*' => 'exists:categories,slug',
            'main_image' => 'nullable|image|max:2048',
            'gallery.*' => 'nullable|image|max:2048',
        ];

    }
}
