<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tim;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TimController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Tim::query()->with(['petugasSatu', 'petugasDua']);

        if ($request->filled('search')) {
            $query->whereHas('petugasSatu', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%');
            })->orWhereHas('petugasDua', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%');
            });
        }
        if ($request->filled('tahun')) {
            $query->orWhere('tahun', $request->tahun);
        }
        if ($request->filled('bulan')) {
            $query->orWhere('bulan', $request->bulan);
        }
        if ($request->filled('sort') && $request->filled('direction')) {
            $query->orderBy($request->sort, $request->direction);
        }
        $jumlahPerBulanTahun = (clone $query)->selectRaw('bulan, tahun, COUNT(*) as total')
            ->groupBy('bulan', 'tahun')
            ->orderBy('tahun', 'desc')
            ->get();
        $jumlahPerTahun = (clone $query)->selectRaw('tahun, COUNT(*) as total')
        ->groupBy('tahun')
        ->orderBy('tahun', 'desc')
        ->get();
        $tim = $query->paginate(10)->withQueryString();
        return Inertia::render('admin/tim/index', [
            'tim' => $tim,
            'jumlahPerBulanTahun' => $jumlahPerBulanTahun,
            'jumlahPerTahun' => $jumlahPerTahun,
            'filter' => $request->only(['search', 'sort', 'direction', 'bulan', 'tahun']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = User::where('status', 'aktif')->get();
        return Inertia::render('admin/tim/create', [
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
        Tim::create($validated);
        return redirect()->route('admin.tim.index')->with('success', 'Tim berhasil dibuat');
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
        $tim = Tim::findOrFail($id);
        $user = User::where('status', 'aktif')->get();
        return Inertia::render('admin/tim/edit', [
            'user' => $user,
            'tim' => $tim
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $tim = Tim::findOrFail($id);
        $validated = $request->validate([
            'petugas1' => ['required', 'exists:users,id', 'different:petugas2'],
            'petugas2' => ['required', 'exists:users,id'],
            'bulan'    => ['required'],
            'tahun'    => ['required'],
        ]);
        $tim->update($validated);
        return redirect()->route('admin.tim.index')->with('success', 'Tim berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tim = Tim::findOrFail($id);
        $tim->delete();
        return redirect()->route('admin.tim.index')->with('success', 'Reklame Reklame berhasil dihapus');
    }
}
