<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Imports\ReklamePreviewImport;
use App\Models\Reklame;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

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
                ->orWhere('jenis_reklame', 'like', '%' . $request->search . '%')
                ->orWhere('isi_konten', 'like', '%' . $request->search . '%');
        }
        if ($request->filled('start_date')) {
            $query->whereDate('tgl_penetapan', '>=', Carbon::parse($request->start_date));
        }
        if ($request->filled('end_date')) {
            $query->whereDate('tgl_selesai_penetapan', '<=', Carbon::parse($request->end_date));
        }
        if ($request->filled('monitoring')) {
            $query->orWhere('monitoring', 'like', '%' . $request->monitoring . '%');
        }
        if ($request->filled('jalan')) {
            $query->orWhere('jalan', 'like', '%' . $request->jalan . '%');
        }
        if ($request->filled('isi_konten')) {
            $query->orWhere('isi_konten', 'like', '%' . $request->isi_konten . '%');
        }
        if ($request->filled('jenis_reklame')) {
            $query->orWhere('jenis_reklame', 'like', '%' . $request->jenis_reklame . '%');
        }
        if ($request->filled('sort') && $request->filled('direction')) {
            $query->orderBy($request->sort, $request->direction);
        }
        $monitoringCounts = (clone $query)->selectRaw('
            SUM(CASE WHEN monitoring = "iya" THEN 1 ELSE 0 END) as iya,
            SUM(CASE WHEN monitoring = "tidak" THEN 1 ELSE 0 END) as tidak,
            SUM(CASE WHEN monitoring = "kosong" OR monitoring = "" THEN 1 ELSE 0 END) as kosong
        ')->first();
        $perpanjanganCounts = (clone $query)->selectRaw('
            SUM(CASE WHEN perpanjangan = "sudah" THEN 1 ELSE 0 END) as sudah,
            SUM(CASE WHEN perpanjangan = "belum" THEN 1 ELSE 0 END) as belum,
            SUM(CASE WHEN perpanjangan = "kosong" OR perpanjangan = "" THEN 1 ELSE 0 END) as kosong
        ')->first();
        $jenis_reklameCounts = (clone $query)->selectRaw('
            SUM(CASE WHEN jenis_reklame = "BANDO" THEN 1 ELSE 0 END) as BANDO,
            SUM(CASE WHEN jenis_reklame = "BILLBOARD TANAH NEGARA" THEN 1 ELSE 0 END) as BILLBOARD_TANAH_NEGARA,
            SUM(CASE WHEN jenis_reklame = "BILLBOARD TANAH SENDIRI" THEN 1 ELSE 0 END) as BILLBOARD_TANAH_SENDIRI,
            SUM(CASE WHEN jenis_reklame = "BILLBOARD TANAH SENDIRI BERSINAR" THEN 1 ELSE 0 END) as BILLBOARD_TANAH_SENDIRI_BERSINAR,
            SUM(CASE WHEN jenis_reklame = "BILLBOARD TANAH NEGARA BERSINAR / NBTN" THEN 1 ELSE 0 END) as BILLBOARD_TANAH_NEGARA_BERSINAR_NBTN,
            SUM(CASE WHEN jenis_reklame = "NEON BOX TANAH NEGARA" THEN 1 ELSE 0 END) as NEON_BOX_TANAH_NEGARA,
            SUM(CASE WHEN jenis_reklame = "NEON BOX TANAH SENDIRI" THEN 1 ELSE 0 END) as NEON_BOX_TANAH_SENDIRI,
            SUM(CASE WHEN jenis_reklame = "NON KONSTRUKSI " THEN 1 ELSE 0 END) as NON_KONSTRUKSI,
            SUM(CASE WHEN jenis_reklame = "Large Electronic Display (LED)" THEN 1 ELSE 0 END) as LED,
            SUM(CASE WHEN jenis_reklame = "SS (SHOP SIGN)" THEN 1 ELSE 0 END) as SHOP_SIGN
        ')->first();
        $reklame = $query->paginate(10)->withQueryString();
        return Inertia::render('admin/reklame/index', [
            'reklame' => $reklame,
            'monitoring' => [
                'iya' => $monitoringCounts->iya,
                'tidak' => $monitoringCounts->tidak,
                'kosong' => $monitoringCounts->kosong,
            ],
            'perpanjangan' => [
                'sudah' => $perpanjanganCounts->sudah,
                'belum' => $perpanjanganCounts->belum,
                'kosong' => $perpanjanganCounts->kosong,
            ],
            'jenis_reklame' => [
                'BANDO' => $jenis_reklameCounts->BANDO,
                'BILLBOARD_TANAH_NEGARA' => $jenis_reklameCounts->BILLBOARD_TANAH_NEGARA,
                'BILLBOARD_TANAH_SENDIRI' => $jenis_reklameCounts->BILLBOARD_TANAH_SENDIRI,
                'BILLBOARD_TANAH_SENDIRI_BERSINAR' => $jenis_reklameCounts->BILLBOARD_TANAH_SENDIRI_BERSINAR,
                'BILLBOARD_TANAH_NEGARA_BERSINAR_NBTN' => $jenis_reklameCounts->BILLBOARD_TANAH_NEGARA_BERSINAR_NBTN,
                'NEON_BOX_TANAH_NEGARA' => $jenis_reklameCounts->NEON_BOX_TANAH_NEGARA,
                'NEON_BOX_TANAH_SENDIRI' => $jenis_reklameCounts->NEON_BOX_TANAH_SENDIRI,
                'NON_KONSTRUKSI' => $jenis_reklameCounts->NON_KONSTRUKSI,
                'LED' => $jenis_reklameCounts->LED,
                'SHOP_SIGN' => $jenis_reklameCounts->SHOP_SIGN,
            ],
            'filter' => $request->only(['search', 'sort', 'direction', 'start_date', 'end_date', 'monitoring', 'perpanjangan', 'jalan','jenis_reklame']),
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

    public function import()
    {
        $preview = session('reklame_preview', null);

        return Inertia::render('admin/import/index', [
            'preview' => $preview,
        ]);
    }
    public function preview(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls,csv',
        ]);

        $import = new ReklamePreviewImport();
        Excel::import($import, $request->file('file'));

        $rows = $import->rows;
        $header = $rows->first()?->keys() ?? [];
        $totalRows = $rows->count();
        $kategori = $rows->pluck('jenis_reklame')->unique()->values();

        session([
            'reklame_preview' => [
                'header' => $header,
                'rows' => $rows,
                'total' => $totalRows,
                'kategori' => $kategori,
            ]
        ]);

        return redirect()->route('admin.import');
    }
    public function confirm()
    {
        $preview = session('reklame_preview');

        if (!$preview || !isset($preview['rows'])) {
            return redirect()->back()->with('error', 'Tidak ada data untuk diimpor.');
        }

        $rows = $preview['rows'];

        foreach ($rows as $row) {
            Reklame::create([
                'id_pendaftaran' => $row['id_pendaftaran'],
                'prev_id_pendaftaran' => $row['prev_id_pendaftaran'],
                'monitoring' => $row['monitoring'],
                'perpanjangan' => $row['perpanjangan'],
                'nama_pemohon' => $row['nama_pemohon'],
                'alamat_pemohon' => $row['alamat_pemohon'],
                'nama_perusahaan' => $row['nama_perusahaan'],
                'alamat_perusahaan' => $row['alamat_perusahaan'],
                'jalan' => $row['jalan'],
                'isi_konten' => $row['isi_konten'],
                'tgl_penetapan' => $row['tgl_penetapan'],
                'tgl_selesai_penetapan' => $row['tgl_selesai_penetapan'],
                'latitude' => $row['latitude'],
                'longitude' => $row['longitude'],
                'lokasi' => $row['lokasi'],
                'foto_reklame' => $row['foto_reklame'],
                'no_hp_pemohon' => $row['no_hp_pemohon'],
                'jenis_reklame' => $row['jenis_reklame'],
                'jumlah_sisi' => $row['jumlah_sisi'],
                'keterangan_lokasi' => $row['keterangan_lokasi'],
            ]);
        }

        // Hapus session preview setelah berhasil diimpor
        Session::forget('reklame_preview');

        return redirect()->route('admin.reklame.index')->with('success', 'Data berhasil diimpor.');
    }
}
