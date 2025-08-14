<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AttributeOption extends Model
{
    protected $fillable = [
        'attribute_id',
        'value',
        'label'
    ];

    public function attribute()
    {
        return $this->belongsTo(Attribute::class);
    }
    // AttributeOption.php
    public function productVariations()
    {
        return $this->belongsToMany(ProductVariation::class, 'attribute_option_product_variation');
    }

}