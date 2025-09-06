<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DokumenController;
use App\Http\Controllers\Admin\ImportController;
use App\Http\Controllers\Admin\JadwalController;
use App\Http\Controllers\Admin\MonitoringController;
use App\Http\Controllers\Admin\PetaController;
use App\Http\Controllers\Admin\ReklameController;
use App\Http\Controllers\Admin\PetugasController;
use App\Http\Controllers\Admin\TimController;

use App\Http\Controllers\Tim\DashboardController as TimDashboardController;
use App\Http\Controllers\Tim\MonitoringController as TimMonitoringController;
use App\Http\Controllers\Tim\PetaController as TimPetaController;
use App\Http\Controllers\Tim\JadwalController as TimJadwalController;

use App\Http\Controllers\Kabid\ApprovalController as KabidApprovalController;
use App\Http\Controllers\Kabid\PetaController as KabidPetaController;
use App\Http\Controllers\Kabid\DashboardController as KabidDashboardController;
use App\Http\Controllers\Kabid\JadwalController as KabidJadwalController;

use App\Http\Middleware\RoleAdmin;
use App\Http\Middleware\RoleKabid;
use App\Http\Middleware\RoleTim;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
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
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('import', [ImportController::class, 'index'])->name('import');
        Route::post('import/preview', [ImportController::class, 'preview'])->name('import.preview');
        Route::post('import/confirm', [ImportController::class, 'confirm'])->name('import.confirm');
        Route::get('peta', [PetaController::class, 'index'])->name('peta');
        Route::post('generate-surat-tugas-batch', [DokumenController::class, 'generateSuratTugasBatch']);
        Route::get('dokumen/request-approval/{id}', [DokumenController::class, 'requestApproval'])->name('dokumen.requestApproval');
        Route::get('dokumen/{id}/sendApproval', [DokumenController::class, 'sendApproval'])->name('dokumen.sendApproval');
        Route::get('dokumen/{id}/show', [DokumenController::class, 'show'])->name('dokumen.show');
        Route::get('dokumen', [DokumenController::class, 'index'])->name('dokumen.index');
    });

    Route::middleware(RoleKabid::class)->prefix('kabid')->name('kabid.')->group(function () {
        Route::get('dashboard', [KabidDashboardController::class, 'index'])->name('dashboard');
        Route::get('approval', [KabidApprovalController::class, 'index'])->name('approval.index');
        Route::get('approval/{id}/edit', [KabidApprovalController::class, 'edit'])->name('approval.edit');
        Route::put('approval/{id}', [KabidApprovalController::class, 'update'])->name('approval.update');
        Route::get('peta', [KabidPetaController::class, 'index'])->name('peta.index');
        Route::get('jadwal', [KabidJadwalController::class, 'index'])->name('jadwal.index');
    });

    Route::middleware(RoleTim::class)->prefix('tim')->name('tim.')->group(function () {
        Route::get('dashboard', [TimDashboardController::class, 'index'])->name('dashboard');
        Route::get('monitoring', [TimMonitoringController::class, 'index'])->name('monitoring.index');
        Route::get('monitoring/{id}/edit', [TimMonitoringController::class, 'edit'])->name('monitoring.edit');
        Route::patch('monitoring/{id}', [TimMonitoringController::class, 'update'])->name('monitoring.update');
        Route::get('monitoring/{id}/print', [TimMonitoringController::class, 'print'])->name('monitoring.print');
        Route::get('peta', [TimPetaController::class, 'index'])->name('peta.index');
        Route::get('jadwal', [TimJadwalController::class, 'index'])->name('jadwal.index');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
    