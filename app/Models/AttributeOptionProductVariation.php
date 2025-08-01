<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AttributeOptionProductVariation extends Model
{
    protected $table = 'attribute_option_product_variation';

    protected $fillable = [
        'product_variation_id',
        'attribute_option_id',
        // Optional: add other custom fields here, like:
        // 'value'
    ];

    public function productVariation()
    {
        return $this->belongsTo(ProductVariation::class);
    }

    public function attributeOption()
    {
        return $this->belongsTo(AttributeOption::class);
    }
}
