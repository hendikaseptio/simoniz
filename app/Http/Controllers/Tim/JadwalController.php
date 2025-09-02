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
        $currentTim = Tim::where('petugas1', Auth::user()->id)->orWhere('petugas2', Auth::user()->id)->first();
        if (!$currentTim) {
            $jadwal = Monitoring::with(['tim.petugasSatu', 'tim.petugasDua', 'reklame'])->where('tim_id', 0)->get();
        } else {
            $jadwal = Monitoring::with(['tim.petugasSatu', 'tim.petugasDua', 'reklame'])->where('tim_id', $currentTim->id)->get();
        }
        // $jadwal = Monitoring::with(['tim.petugasSatu', 'tim.petugasDua', 'reklame'])->get();
        $tim = Tim::with(['petugasSatu', 'petugasDua'])->where('status', 'aktif')->get();
        return Inertia::render('tim/jadwal/index', [
            'jadwal' => $jadwal,
            'tim' => $tim,
            'filters' => $request->only(['search', 'sort', 'direction', 'tim_id']),
        ]);
    }
}
