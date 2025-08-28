<?php

use App\Http\Controllers\Admin\dashboardController;
use App\Http\Controllers\Admin\DokumenController;
use App\Http\Controllers\Admin\ImportController;
use App\Http\Controllers\Admin\JadwalController;
use App\Http\Controllers\Admin\MonitoringController;
use App\Http\Controllers\Admin\PetaController;
use App\Http\Controllers\Admin\ReklameController;
use App\Http\Controllers\Admin\PetugasController;
use App\Http\Controllers\Admin\TimController;
use App\Http\Middleware\RoleAdmin;
use App\Http\Middleware\RoleKabid;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

use App\Http\Controllers\Kabid\ApprovalController as KabidApprovalController;

Route::get('/', function () {
    // return Inertia::render('welcome');
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::middleware(RoleAdmin::class)->prefix('admin')->name('admin.')->group(function () {
        Route::resource('petugas', PetugasController::class);
        Route::resource('reklame', ReklameController::class);
        Route::resource('tim', TimController::class);
        Route::resource('jadwal', JadwalController::class);
        Route::resource('monitoring', MonitoringController::class);
        // import 
        Route::get('dashboard', [dashboardController::class, 'index'])->name('index');
        Route::get('import', [ImportController::class, 'index'])->name('import');
        Route::post('import/preview', [ImportController::class, 'preview'])->name('import.preview');
        Route::post('import/confirm', [ImportController::class, 'confirm'])->name('import.confirm');

        Route::get('peta', [PetaController::class, 'index'])->name('peta');
        Route::post('generate-surat-tugas-batch', [DokumenController::class, 'generateSuratTugasBatch']);
        Route::post('generate-berita-acara-batch', [DokumenController::class, 'generateBeritaAcaraBatch']);
        Route::get('dokumen/request-approval/{id}', [DokumenController::class, 'requestApproval'])->name('dokumen.requestApproval');
        Route::get('dokumen/{id}/sendApproval', [DokumenController::class, 'sendApproval'])->name('dokumen.sendApproval');
        Route::get('dokumen/{id}/show', [DokumenController::class, 'show'])->name('dokumen.show');
        Route::get('dokumen', [DokumenController::class, 'index'])->name('dokumen.index');
    });

    Route::middleware(RoleKabid::class)->prefix('kabid')->name('kabid.')->group(function () {
        Route::get('approval', [KabidApprovalController::class, 'index'])->name('approval.index');
        Route::get('approval/{id}/edit', [KabidApprovalController::class, 'edit'])->name('approval.edit');
        Route::put('approval/{id}', [KabidApprovalController::class, 'update'])->name('approval.update');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
