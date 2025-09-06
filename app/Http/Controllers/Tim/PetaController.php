<?php

namespace App\Http\Controllers\Tim;

use App\Http\Controllers\Controller;
use App\Models\Monitoring;
use App\Models\Reklame;
use App\Models\Tim;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PetaController extends Controller
{
    public function index(Request $request)
    {
        $currentTim = Tim::where('petugas1', Auth::user()->id)->orWhere('petugas2', Auth::user()->id)->first();
        if (!$currentTim) {
            $query = Monitoring::query()->with(['tim.petugasSatu', 'tim.petugasDua', 'reklame'])->where('tim_id', 0);
        } else {
            $query = Monitoring::query()->with(['tim.petugasSatu', 'tim.petugasDua', 'reklame'])->where('tim_id', $currentTim->id);
        }
        if ($request->filled('cek_lapangan')) {
            $query->whereHas('monitoring', function ($q) use ($request) {
                $q->where('cek_lapangan', 'like', '%' . $request->cek_lapangan . '%');
            });
        }
        if ($request->filled('jalan')) {
            $query->orWhere('jalan', 'like', '%' . $request->jalan . '%');
        }
        if ($request->filled('id_pendaftaran')) {
            $query->orWhere('id_pendaftaran', 'like', '%' . $request->id_pendaftaran . '%');
        }
        if ($request->filled('isi_konten')) {
            $query->orWhere('isi_konten', 'like', '%' . $request->isi_konten . '%');
        }
        if ($request->filled('jenis_reklame')) {
            $query->orWhere('jenis_reklame', 'like', '%' . $request->jenis_reklame . '%');
        }
        $reklame = $query->get();

        return Inertia::render('tim/peta/index', [
            'reklame' => $reklame,
        ]);
    }
}
