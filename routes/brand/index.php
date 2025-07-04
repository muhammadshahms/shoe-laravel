<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BrandController;

Route::middleware('auth')->prefix('dashboard')->group(function () {
    Route::resource('brands', BrandController::class);
});
