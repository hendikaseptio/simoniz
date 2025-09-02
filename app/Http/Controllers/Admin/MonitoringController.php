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
        $query->where(function ($q) use ($request) {
            $q->whereHas('tim.petugasSatu', function ($qt1) use ($request) {
                $qt1->where('name', 'like', '%' . $request->search . '%');
            })->orWhereHas('tim.petugasDua', function ($qt2) use ($request) {
                $qt2->where('name', 'like', '%' . $request->search . '%');
            })->orWhereHas('reklame', function ($qr) use ($request) {
                $qr->where('id_pendaftaran', 'like', '%' . $request->search . '%');
            });
        });
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
        if ($request->hasFile('foto')) {
            if ($monitoring->foto && Storage::disk('public')->exists($monitoring->foto)) {
                Storage::disk('public')->delete($monitoring->foto);
            }
            $path = $request->file('foto')->store('monitoring_foto', 'public');
            $validated['foto'] = $path;
        }
        $monitoring->update($validated);
        return redirect()->route('admin.monitoring.index')->with('success', 'Data monitoring berhasil diperbarui.');
    }
}
