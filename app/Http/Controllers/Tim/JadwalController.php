<?php

namespace App\Http\Controllers\Tim;

use App\Http\Controllers\Controller;
use App\Models\Monitoring;
use App\Models\Tim;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class JadwalController extends Controller
{
    public function index(Request $request)
    {
        $currentTims = Tim::where('petugas1', Auth::user()->id)
        ->orWhere('petugas2', Auth::user()->id)
        ->get();

    if ($currentTims->isEmpty()) {
        $jadwal = Monitoring::with(['tim.petugasSatu', 'tim.petugasDua', 'reklame'])
            ->where('tim_id', 0)
            ->get();
    } else {
        $timIds = $currentTims->pluck('id');

        $jadwal = Monitoring::with(['tim.petugasSatu', 'tim.petugasDua', 'reklame'])
            ->whereIn('tim_id', $timIds)
            ->get();
    }

    $tim = Tim::with(['petugasSatu', 'petugasDua'])
        ->where('status', 'aktif')
        ->get();

    return Inertia::render('tim/jadwal/index', [
        'jadwal' => $jadwal,
        'tim' => $tim,
        'filters' => $request->only(['search', 'sort', 'direction', 'tim_id']),
    ]);
    }
}
