<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    protected $fillable = [
        'name',
        'code',
        'description',
        'is_active',
        'is_cash_on_delivery',
        'config'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_cash_on_delivery' => 'boolean',
        'config' => 'array',
    ];
}