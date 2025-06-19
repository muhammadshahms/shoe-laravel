<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    protected $fillable = [
        'name',
        'code',
        'type',
        'is_filterable'
    ];

    protected $casts = [
        'is_filterable' => 'boolean',
    ];

    public function options()
    {
        return $this->hasMany(AttributeOption::class);
    }
}