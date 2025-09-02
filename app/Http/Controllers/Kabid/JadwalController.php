<?php

namespace App\Http\Controllers\Kabid;

use App\Http\Controllers\Controller;
use App\Models\Monitoring;
use App\Models\Tim;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JadwalController extends Controller
{
    public function index(Request $request)
    {
        // $query = Monitoring::query()->with(['tim.petugasSatu', 'tim.petugasDua', 'reklame']);

        // if ($request->filled('search')) {
        //     $query->where('tim_st', 'like', '%' . $request->search . '%')
        //         ->orWhere('reklame_id', $request->search)
        //         ->orWhereHas('reklame', function ($qr) use ($request) {
        //             $qr->where('id_pendaftaran', 'like', '%' . $request->search . '%');
        //         });
        // }

        // if ($request->filled('sort') && $request->filled('direction')) {
        //     $query->orderBy($request->sort, $request->direction);
        // } else {
        //     $query->orderBy('created_at', 'desc');
        // }
        // if ($request->filled('tim_id')) {
        //     $query->where('tim_id', $request->tim_id);
        // }
        // $jumlahJadwalAktif = (clone $query)->where('cek_lapangan', 'belum')->count();
        // $jumlahJadwalTidakAktif = (clone $query)->where('cek_lapangan', 'sudah')->count();
        // $jadwal = $query->paginate(10)->through(function ($item) {
        //     $item->tim_st_names_string = $item->tim_st_names_string;
        //     return $item;
        // })->withQueryString();
        $jadwal = Monitoring::with(['tim.petugasSatu', 'tim.petugasDua', 'reklame'])->get();
        $tim = Tim::with(['petugasSatu', 'petugasDua'])->where('status', 'aktif')->get();
        return Inertia::render('kabid/jadwal/index', [
            'jadwal' => $jadwal,
            'tim' => $tim,
            // 'jumlahJadwalAktif' => $jumlahJadwalAktif,
            // 'jumlahJadwalTidakAktif' => $jumlahJadwalTidakAktif,
            'filters' => $request->only(['search', 'sort', 'direction', 'tim_id']),
        ]);
    }
}
