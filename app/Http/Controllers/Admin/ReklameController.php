<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reklame;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReklameController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Reklame::query();

        if ($request->filled('search')) {
            $query->where('id_pendaftaran', 'like', '%' . $request->search . '%')
                ->orWhere('nama_pemohon', 'like', '%' . $request->search . '%')
                ->orWhere('nama_perusahaan', 'like', '%' . $request->search . '%')
                ->orWhere('jenis_reklame', 'like', '%' . $request->search . '%');
        }
        // Filter berdasarkan tanggal
        if ($request->filled('start_date')) {
            $query->whereDate('tgl_penetapan', '>=', Carbon::parse($request->start_date));
        }

        if ($request->filled('end_date')) {
            $query->whereDate('tgl_penetapan', '<=', Carbon::parse($request->end_date));
        }

        if ($request->filled('sort') && $request->filled('direction')) {
            $query->orderBy($request->sort, $request->direction);
        }
        $reklame = $query->paginate(10)->withQueryString();
        return Inertia::render('admin/reklame/index', [
            'reklame' => $reklame,
            'filter' => $request->only(['search', 'sort', 'direction', 'start_date', 'end_date']),
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/reklame/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'id_pendaftaran' => 'required|integer',
            'prev_id_pendaftaran' => 'nullable|integer',
            'monitoring' => 'required|in:iya,tidak,kosong',
            'perpanjangan' => 'required|in:sudah,belum,kosong',
            'nama_pemohon' => 'required|string|max:255',
            'alamat_pemohon' => 'required|string',
            'nama_perusahaan' => 'required|string|max:255',
            'alamat_perusahaan' => 'required|string',
            'jalan' => 'required|string|max:255',
            'isi_konten' => 'required|string',
            'tgl_penetapan' => 'required|date',
            'tgl_selesai_penetapan' => 'required|date|after_or_equal:tgl_penetapan',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'lokasi' => 'nullable|string|max:255',
            'foto_reklame' => 'required|string|max:255',
            'no_hp_pemohon' => 'required|string|max:20',
            'jenis_reklame' => 'required|string|max:100',
            'jumlah_sisi' => 'required|integer|min:1',
            'keterangan_lokasi' => 'nullable|string',
        ]);

        Reklame::create([
            'id_pendaftaran' => $request->id_pendaftaran,
            'prev_id_pendaftaran' => $request->prev_id_pendaftaran,
            'monitoring' => $request->monitoring,
            'perpanjangan' => $request->perpanjangan,
            'nama_pemohon' => $request->nama_pemohon,
            'alamat_pemohon' => $request->alamat_pemohon,
            'nama_perusahaan' => $request->nama_perusahaan,
            'alamat_perusahaan' => $request->alamat_perusahaan,
            'jalan' => $request->jalan,
            'isi_konten' => $request->isi_konten,
            'tgl_penetapan' => $request->tgl_penetapan,
            'tgl_selesai_penetapan' => $request->tgl_selesai_penetapan,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'lokasi' => $request->lokasi,
            'foto_reklame' => $request->foto_reklame,
            'no_hp_pemohon' => $request->no_hp_pemohon,
            'jenis_reklame' => $request->jenis_reklame,
            'jumlah_sisi' => $request->jumlah_sisi,
            'keterangan_lokasi' => $request->keterangan_lokasi,
        ]);

        return redirect()->route('admin.reklame.index')->with('success', 'Reklame Reklame berhasil dibuat');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $reklame = Reklame::findOrFail($id);
        return Inertia::render('admin/reklame/show', [
            'reklame' => $reklame,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $reklame = Reklame::findOrFail($id);
        return Inertia::render('admin/reklame/edit', [
            'reklame' => $reklame,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = Reklame::findOrFail($id);

        $request->validate([
            'id_pendaftaran' => 'required|integer',
            'prev_id_pendaftaran' => 'nullable|integer',
            'monitoring' => 'required|in:iya,tidak,kosong',
            'perpanjangan' => 'required|in:sudah,belum,kosong',
            'nama_pemohon' => 'required|string|max:255',
            'alamat_pemohon' => 'required|string',
            'nama_perusahaan' => 'required|string|max:255',
            'alamat_perusahaan' => 'required|string',
            'jalan' => 'required|string|max:255',
            'isi_konten' => 'required|string',
            'tgl_penetapan' => 'required|date',
            'tgl_selesai_penetapan' => 'required|date|after_or_equal:tgl_penetapan',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'lokasi' => 'nullable|string|max:255',
            'foto_reklame' => 'required|string|max:255',
            'no_hp_pemohon' => 'required|string|max:20',
            'jenis_reklame' => 'required|string|max:100',
            'jumlah_sisi' => 'required|integer|min:1',
            'keterangan_lokasi' => 'nullable|string',
        ]);
        $user->update([
            'id_pendaftaran' => $request->id_pendaftaran,
            'prev_id_pendaftaran' => $request->prev_id_pendaftaran,
            'monitoring' => $request->monitoring,
            'perpanjangan' => $request->perpanjangan,
            'nama_pemohon' => $request->nama_pemohon,
            'alamat_pemohon' => $request->alamat_pemohon,
            'nama_perusahaan' => $request->nama_perusahaan,
            'alamat_perusahaan' => $request->alamat_perusahaan,
            'jalan' => $request->jalan,
            'isi_konten' => $request->isi_konten,
            'tgl_penetapan' => $request->tgl_penetapan,
            'tgl_selesai_penetapan' => $request->tgl_selesai_penetapan,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'lokasi' => $request->lokasi,
            'foto_reklame' => $request->foto_reklame,
            'no_hp_pemohon' => $request->no_hp_pemohon,
            'jenis_reklame' => $request->jenis_reklame,
            'jumlah_sisi' => $request->jumlah_sisi,
            'keterangan_lokasi' => $request->keterangan_lokasi,
        ]);

        return redirect()->route('admin.reklame.index')->with('success', 'Reklame berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = Reklame::findOrFail($id);
        $user->delete();

        return redirect()->route('admin.reklame.index')->with('success', 'Reklame Reklame berhasil dihapus');
    }
}
