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

    // ProductVariation.php
    public function attributeOptionPivots()
    {
        return $this->hasMany(AttributeOptionProductVariation::class);
    }

    public function attributeOptions()
    {
        return $this->belongsToMany(AttributeOption::class, 'attribute_option_product_variation');
    }
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}