<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Spatie\Permission\Middlewares\RoleMiddleware;


Route::prefix('dashboard')->middleware(['auth', 'admin'])->group(function () {
    // Dashboard main view
    Route::get('/', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Settings redirect (FIXED path)
    Route::redirect('settings', 'settings/profile');

    // Profile settings
    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('dashboard.settings.profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('dashboard.settings.profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('dashboard.settings.profile.destroy');

    // Password settings
    Route::get('settings/password', [PasswordController::class, 'edit'])->name('dashboard.settings.password.edit');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('dashboard.settings.password.update');

    // Appearance
    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('dashboard.settings.appearance');
});