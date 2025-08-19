<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Monitoring;
use App\Models\Tim;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MonitoringController extends Controller
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
        if ($request->filled('cek_lapangan')) {
            $query->where('cek_lapangan', $request->cek_lapangan);
        }
        $cekLapangan = (clone $query)->selectRaw('
            SUM(CASE WHEN cek_lapangan = "sudah" THEN 1 ELSE 0 END) as sudah,
            SUM(CASE WHEN cek_lapangan = "belum" THEN 1 ELSE 0 END) as belum
        ')->first();
        $monitoring = $query->paginate(10)->through(function ($item) {
            $item->tim_st_names_string = $item->tim_st_names_string;
            return $item;
        })->withQueryString();
        $tim = Tim::with(['petugasSatu', 'petugasDua'])->where('status', 'aktif')->get();

        return Inertia::render('admin/monitoring/index', [
            'monitoring' => $monitoring,
            'tim' => $tim,
            'cekLapangan' => [
                'sudah' => $cekLapangan->sudah ?? 0,
                'belum' => $cekLapangan->belum ?? 0,
            ],
            'filters' => $request->only(['search', 'sort', 'direction', 'tim_id', 'cek_lapangan']),
        ]);
        return Inertia::render('admin/monitoring/index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/monitoring/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
        return Inertia::render('admin/monitoring/edit', [
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
            'cek_lapangan' => 'required|in:sudah,belum',
            'status' => 'required|in:berlaku,tidak berlaku',
            'keberadaan_reklame' => 'required|in:ada,tidak ada',
            'kelayakan_kontruksi' => 'required|in:layak,tidak layak,-',
            'kesesuaian' => 'required|in:sesuai,tidak sesuai,-',
            'catatan' => 'nullable|string',
            'tl' => 'required|in:ya,tidak',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'foto' => 'nullable|file|image|max:2048',
        ]);

        // Jika ada foto baru di-upload
        if ($request->hasFile('foto')) {
            // Hapus foto lama kalau ada
            if ($monitoring->foto && Storage::disk('public')->exists($monitoring->foto)) {
                Storage::disk('public')->delete($monitoring->foto);
            }

            // Simpan foto baru
            $path = $request->file('foto')->store('monitoring_foto', 'public');
            $validated['foto'] = $path;
        }

        // Update data ke database
        $monitoring->update($validated);

        // Redirect atau balikan response inertia
        return redirect()->route('admin.monitoring.index')->with('success', 'Data monitoring berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
