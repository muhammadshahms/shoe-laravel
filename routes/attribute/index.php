<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AttributeController;
use App\Http\Controllers\AttributeOptionController;

Route::prefix('dashboard')->middleware('auth')->group(function () {
    Route::resource('attributes', AttributeController::class);

    Route::prefix('attributes/{attribute}')->group(function () {
        Route::resource('options', AttributeOptionController::class)
            ->names('attributes.options')
            ->parameters(['options' => 'option']);
    });
});