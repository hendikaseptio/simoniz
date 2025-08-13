<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Monitoring;
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
        $query = Monitoring::query()->with(['petugasSatu', 'petugasDua']);

        if ($request->filled('search')) {
            $query->where('tim_st', 'like', '%' . $request->search . '%')
                  ->orWhere('id_pendaftaran', $request->search);
        }

        if ($request->filled('sort') && $request->filled('direction')) {
            $query->orderBy($request->sort, $request->direction);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $jadwal = $query->paginate(10)->withQueryString();

        return Inertia::render('admin/jadwal/index', [
            'jadwal' => $jadwal,
            'filters' => $request->only(['search', 'sort', 'direction']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $tim = Tim::with(['petugasSatu', 'petugasDua'])->get();
        $user = User::all();
        return Inertia::render('admin/jadwal/create', [
            'tim' => $tim,
            'user' => $user
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'petugas1' => ['required', 'exists:users,id', 'different:petugas2'],
            'petugas2' => ['required', 'exists:users,id'],
            'bulan'    => ['required'],
            'tahun'    => ['required'],
        ]);
        Monitoring::create($validated);
        return redirect()->route('admin.monitoring.index')->with('success', 'Monitoring berhasil dibuat');
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
        $monitoring = Monitoring::findOrFail($id);
        $user = User::where('status', 'aktif')->get();
        return Inertia::render('admin/jadwal/edit', [
            'user' => $user,
            'monitoring' => $monitoring
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $monitoring = Monitoring::findOrFail($id);
        $validated = $request->validate([
            'petugas1' => ['required', 'exists:users,id', 'different:petugas2'],
            'petugas2' => ['required', 'exists:users,id'],
            'bulan'    => ['required'],
            'tahun'    => ['required'],
        ]);
        $monitoring->update($validated);
        return redirect()->route('admin.monitoring.index')->with('success', 'Monitoring berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $monitoring = Monitoring::findOrFail($id);
        $monitoring->delete();
        return redirect()->route('admin.monitoring.index')->with('success', 'Reklame Reklame berhasil dihapus');
    }
}
