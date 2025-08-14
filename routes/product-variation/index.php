<?php
use App\Http\Controllers\ProductVariationController;
use Illuminate\Support\Facades\Route;

Route::prefix('dashboard')->middleware('auth')->group(function () {
    Route::resource('product-variations', ProductVariationController::class);
});

