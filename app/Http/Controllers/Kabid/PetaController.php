<?php

namespace App\Http\Controllers\Kabid;

use App\Http\Controllers\Controller;
use App\Models\Reklame;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PetaController extends Controller
{
    public function index(Request $request)
    {
        $query = Reklame::query()->with('monitoring');
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
        $reklame = $query->whereNotNull('latitude')->whereNotNull('longitude')->get();

        return Inertia::render('kabid/peta/index', [
            'reklame' => $reklame,
        ]);
    }
}
