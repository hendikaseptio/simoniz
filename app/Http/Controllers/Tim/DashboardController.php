<?php

namespace App\Http\Controllers\Tim;

use App\Http\Controllers\Controller;
use App\Models\Monitoring;
use App\Models\Reklame;
use App\Models\Tim;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index() {

        $currentTims = Tim::where('petugas1', Auth::user()->id)
        ->orWhere('petugas2', Auth::user()->id)
        ->get();

    if ($currentTims->isEmpty()) {
        $reklame = Monitoring::with(['tim.petugasSatu', 'tim.petugasDua', 'reklame'])
            ->where('tim_id', 0)
            ->get();

        $jadwal = Monitoring::with(['tim.petugasSatu', 'tim.petugasDua', 'reklame'])
            ->where('tim_id', 0)
            ->get();
    } else {
        $timIds = $currentTims->pluck('id');

        $reklame = Monitoring::with(['tim.petugasSatu', 'tim.petugasDua', 'reklame'])
            ->whereIn('tim_id', $timIds)
            ->get();

        $jadwal = Monitoring::with(['tim.petugasSatu', 'tim.petugasDua', 'reklame'])
            ->whereIn('tim_id', $timIds)
            ->get();
    }

    $tim = Tim::with(['petugasSatu', 'petugasDua'])
        ->where('status', 'aktif')
        ->count();
        $petugas = User::all()->count();
        // $tim = Tim::all()->count();
        $monitoring = Monitoring::all()->count();
        return Inertia::render('tim/dashboard', [
            'reklame' => $reklame,
            'petugas' => $petugas,
            'tim' => $tim,
            'jadwal' => $jadwal,
            'monitoring' => $monitoring,
        ]);
    }
}
