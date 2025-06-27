<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

require __DIR__.'/dashboard.php';
require __DIR__.'/auth.php';
require __DIR__.'/product/index.php';
require __DIR__.'/category/index.php';
require __DIR__.'/product-variation/index.php';