<?php
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;

Route::prefix('dashboard')->middleware('auth')->group(function () {
    // Custom route placed BEFORE the resource route to prevent conflicts
    Route::get('categories/tree', [CategoryController::class, 'tree'])
        ->name('categories.tree');

    Route::resource('categories', CategoryController::class);
});
