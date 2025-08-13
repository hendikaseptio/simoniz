<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Imports\ReklamePreviewImport;
use App\Models\Reklame;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ImportController extends Controller
{
    public function index()
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
