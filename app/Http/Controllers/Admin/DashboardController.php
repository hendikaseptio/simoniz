<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Monitoring;
use App\Models\Reklame;
use App\Models\Tim;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index() {
        $reklame = Reklame::with('monitoring')->get();
        $petugas = User::all()->count();
        $tim = Tim::all()->count();
        $monitoring = Monitoring::all()->count();
        $jadwal = Monitoring::with(['tim.petugasSatu', 'tim.petugasDua', 'reklame'])->get();
        return Inertia::render('admin/dashboard', [
            'reklame' => $reklame,
            'petugas' => $petugas,
            'jadwal' => $jadwal,
            'tim' => $tim,
            'monitoring' => $monitoring,
        ]);
    }
}
