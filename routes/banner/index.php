<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BannerController;

Route::middleware('auth')->prefix('dashboard')->group(function () {
    Route::resource('banners', BannerController::class);
});
