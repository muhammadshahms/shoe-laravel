<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductVariation extends Model
{
    protected $fillable = [
        'product_id',
        'sku',
        'barcode',
        'price',
        'quantity',
        'in_stock',
        'attributes'
    ];

    protected $casts = [
        'attributes' => 'array',
        'in_stock' => 'boolean',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}