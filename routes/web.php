<?php

use App\Http\Controllers\Admin\ImportController;
use App\Http\Controllers\Admin\ReklameController;
use App\Http\Controllers\Admin\TimController;
use App\Http\Middleware\RoleAdmin;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::middleware(RoleAdmin::class)->prefix('admin')->name('admin.')->group(function () {
        Route::resource('tim', TimController::class);
        Route::resource('reklame', ReklameController::class);
       
        // import 
        Route::get('import', [ImportController::class, 'index'])->name('import');
        Route::post('import/preview', [ImportController::class, 'preview'])->name('import.preview');
        Route::post('import/confirm', [ImportController::class, 'confirm'])->name('import.confirm');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
