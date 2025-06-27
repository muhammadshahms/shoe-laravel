<?php
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::prefix('dashboard')->middleware('auth')->group(function () {
    // ✅ Define custom bulk delete route before resource
    Route::post('products/bulk-delete', [ProductController::class, 'bulkDelete'])
        ->name('products.bulk-delete');

    // ✅ Resource routes
    Route::resource('products', ProductController::class);
});
