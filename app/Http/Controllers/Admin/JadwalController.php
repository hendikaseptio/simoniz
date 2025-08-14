<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Monitoring;
use App\Models\Reklame;
use App\Models\Tim;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JadwalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Monitoring::query()->with(['tim.petugasSatu', 'tim.petugasDua', 'reklame']);

        if ($request->filled('search')) {
            $query->where('tim_st', 'like', '%' . $request->search . '%')
                ->orWhere('reklame_id', $request->search);
        }

        if ($request->filled('sort') && $request->filled('direction')) {
            $query->orderBy($request->sort, $request->direction);
        } else {
            $query->orderBy('created_at', 'desc');
        }
        if ($request->filled('tim_id')) {
            $query->where('tim_id', $request->tim_id);
        }
        $jumlahJadwalAktif = (clone $query)->where('cek_lapangan', 'belum')->count();
        $jumlahJadwalTidakAktif = (clone $query)->where('cek_lapangan', 'sudah')->count();
        $jadwal = $query->paginate(10)->through(function ($item) {
            $item->tim_st_names_string = $item->tim_st_names_string;
            return $item;
        })->withQueryString();
        $tim = Tim::with(['petugasSatu', 'petugasDua'])->where('status', 'aktif')->get();
        return Inertia::render('admin/jadwal/index', [
            'jadwal' => $jadwal,
            'tim' => $tim,
            'jumlahJadwalAktif' => $jumlahJadwalAktif,
            'jumlahJadwalTidakAktif' => $jumlahJadwalTidakAktif,
            'filters' => $request->only(['search', 'sort', 'direction','tim_id']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $reklame = Reklame::where('monitoring', 'iya')->get();
        $tim = Tim::with(['petugasSatu', 'petugasDua'])->where('status', 'aktif')->get();
        $user = User::where('role', 'tim')->get();
        return Inertia::render('admin/jadwal/create', [
            'tim' => $tim,
            'user' => $user,
            'reklame' => $reklame
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'reklame_id' => ['required'],
            'tim_st' => ['required'],
            'tim_id' => ['required'],
            'tanggal' => ['required', 'date'],
        ]);
        Monitoring::create([
            'reklame_id' => $request->reklame_id,
            'tim_st' => implode(",", $request->tim_st),
            'tim_id' => $request->tim_id,
            'tanggal' => $request->tanggal,
        ]);
        return redirect()->route('admin.jadwal.index')->with('success', 'Jadwal berhasil dibuat');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $jadwal = Monitoring::findOrFail($id);
        $reklame = Reklame::where('monitoring', 'iya')->get();
        $tim = Tim::with(['petugasSatu', 'petugasDua'])->where('status', 'aktif')->get();
        $user = User::where('role', 'tim')->get();
        return Inertia::render('admin/jadwal/edit', [
            'user' => $user,
            'jadwal' => $jadwal,
            'tim' => $tim,
            'reklame' => $reklame,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $jadwal = Monitoring::findOrFail($id);
        $request->validate([
            'reklame_id' => ['required'],
            'tim_st' => ['required'],
            'tim_id' => ['required'],
            'tanggal' => ['required', 'date'],
        ]);
        $data = [
            'reklame_id' => $request->reklame_id,
            'tim_st' => implode(",", $request->tim_st),
            'tim_id' => $request->tim_id,
            'tanggal' => $request->tanggal,
        ];
        $jadwal->update($data);
        return redirect()->route('admin.jadwal.index')->with('success', 'Jadwal berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $jadwal = Monitoring::findOrFail($id);
        $jadwal->delete();
        return redirect()->route('admin.jadwal.index')->with('success', 'Reklame Reklame berhasil dihapus');
    }
}
