<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    
    return Inertia::render('welcome');
})->name('home');

Route::get('/product-details', function () {
    return Inertia::render('ProductDetails/Index');
})->name('product-details');
//shop
Route::get('shop', [ProductController::class, 'shop'])->name('shop');

//productdetails
Route::get('product-details/{product:slug}', [ProductController::class, 'productDetail'])->name('product-details.show');


require __DIR__ . '/dashboard.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/product/index.php';
require __DIR__ . '/category/index.php';
require __DIR__ . '/product-variation/index.php';
require __DIR__ . '/attribute/index.php';
require __DIR__ . '/brand/index.php';
require __DIR__ . '/order/index.php';
require __DIR__ . '/banner/index.php';