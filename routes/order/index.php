<?php
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('dashboard')->middleware('auth')->group(function () {
    Route::resource('orders', OrderController::class);
    Route::post('orders/bulk-delete', [OrderController::class, 'bulkDelete'])->name('orders.bulk-delete');
});
Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');
Route::get('/checkout', fn() => Inertia::render('Orders/Checkout'))->middleware('auth')->name('checkout.page');
Route::post('/checkout', [OrderController::class, 'checkout'])->middleware('auth')->name('checkout');
Route::get('/orders/{order}/invoice', [OrderController::class, 'generateInvoice'])
    ->name('orders.invoice');
