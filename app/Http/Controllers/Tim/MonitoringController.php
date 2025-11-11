<?php

namespace App\Http\Controllers\Tim;

use App\Http\Controllers\Controller;
use App\Models\Monitoring;
use App\Models\Tim;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MonitoringController extends Controller
{
    public function index(Request $request)
    {
        $currentTim = Tim::where('petugas1', Auth::user()->id)->orWhere('petugas2', Auth::user()->id)->first();
        if (!$currentTim) {
            $query = Monitoring::query()->with(['tim.petugasSatu', 'tim.petugasDua', 'reklame'])->where('tim_id', 0);
        } else {
            $query = Monitoring::query()->with(['tim.petugasSatu', 'tim.petugasDua', 'reklame'])->where('tim_id', $currentTim->id);
        }
        if ($request->filled('search')) {
            $query->where('tim_st', 'like', '%' . $request->search . '%')
                ->orWhere('reklame_id', $request->search);
        }
        
        if ($request->filled('cek_lapangan')) {
            $query->where('cek_lapangan', $request->cek_lapangan);
        }
        $cekLapangan = (clone $query)->selectRaw('
            SUM(CASE WHEN cek_lapangan = "sudah" THEN 1 ELSE 0 END) as sudah,
            SUM(CASE WHEN cek_lapangan = "belum" THEN 1 ELSE 0 END) as belum
        ')->first();

        if ($request->filled('sort') && $request->filled('direction')) {
            $query->orderBy($request->sort, $request->direction);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $monitoring = $query->paginate(10)->through(function ($item) {
            $item->tim_st_names_string = $item->tim_st_names_string;
            return $item;
        })->withQueryString();
        $tim = Tim::with(['petugasSatu', 'petugasDua'])->where('status', 'aktif')->get();
        return Inertia::render('tim/monitoring/index', [
            'monitoring' => $monitoring,
            'tim' => $tim,
            'cekLapangan' => [
                'sudah' => $cekLapangan->sudah ?? 0,
                'belum' => $cekLapangan->belum ?? 0,
            ],
            'filters' => $request->only(['search', 'sort', 'direction', 'cek_lapangan']),
        ]);
    }
    public function print($id)
    {
        $data = Monitoring::with(['tim.petugasSatu', 'tim.petugasDua', 'reklame', 'tim'])->find($id);
        $tahun = Carbon::parse($data->tanggal)->year;
        $alamat = $this->reverseGeocode($data->latitude, $data->longitude);
        return Inertia::render('tim/monitoring/print', [
            'data' => $data,
            'tahun' => $tahun,
            'alamat' => $alamat,
        ]);
    }
    public function edit(string $id)
    {
        $monitoring = Monitoring::findOrFail($id);
        return Inertia::render('tim/monitoring/edit', [
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
           // 'foto' => 'nullable|file|image|max:2048',
        ]);
        if ($request->hasFile('foto')) {
            if ($monitoring->foto && Storage::disk('public')->exists($monitoring->foto)) {
                Storage::disk('public')->delete($monitoring->foto);
            }
            $path = $request->file('foto')->store('monitoring_foto', 'public');
            $validated['foto'] = $path;
        }
        $monitoring->update($validated);
        return redirect()->route('tim.monitoring.index')->with('success', 'Data monitoring berhasil diperbarui.');
    }

    public function reverseGeocode($lat, $lon)
    {
        $url = "https://nominatim.openstreetmap.org/reverse?format=json&lat={$lat}&lon={$lon}&addressdetails=1";
        $response = Http::withHeaders([
            'User-Agent' => 'YourAppName (your@email.com)'
        ])->get($url);
        if ($response->ok()) {
            $json = $response->json();
            return [
                'display_name' => $json['display_name'] ?? null,
            ];
        }
        return null;
    }
}
