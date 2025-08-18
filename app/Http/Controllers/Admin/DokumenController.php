<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dokumen;
use App\Models\Monitoring;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DokumenController extends Controller
{
    public function index()
    {
        $dokumen = Dokumen::latest()->paginate(10);

        return Inertia::render('admin/dokumen/index', [
            'dokumen' => $dokumen
        ]);
    }

    public function show($id)
    {
        $dokumen = Dokumen::findOrFail($id);

        return Inertia::render('admin/dokumen/show', [
            'dokumen' => $dokumen
        ]);
    }

    public function generateSuratTugasBatch(Request $request)
    {
        $request->validate([
            'month' => 'required|integer|min:1|max:12',
            'year' => 'required|integer|min:2000|max:2100',
        ]);

        $startDate = Carbon::createFromDate($request->year, $request->month, 1)->startOfMonth();
        $endDate = $startDate->copy()->endOfMonth();

        $jadwals = Monitoring::where('cek_lokasi','belum')->whereBetween('tanggal', [$startDate, $endDate])->get();

        if ($jadwals->isEmpty()) {
            return redirect()->back()->with('error', 'Tidak ada jadwal monitoring di bulan tersebut.');
        }

        foreach ($jadwals as $jadwal) {
            $pdf = Pdf::loadView('pdf.surat_tugas', compact('jadwal'));

            $filename = 'surat_tugas_' . $jadwal->id . '_' . Str::random(5) . '.pdf';
            $path = 'dokumen/' . $filename;
            Storage::put('public/' . $path, $pdf->output());

            Dokumen::create([
                'nama' => 'Surat Tugas ' . $jadwal->judul,
                'type' => 'surat_tugas',
                'path' => $path,
                'status' => 'draft',
            ]);
        }

        return redirect()->back()->with('success', 'Batch Surat Tugas berhasil dibuat.');
    }

    public function generateBeritaAcaraBatch(Request $request)
    {
        $request->validate([
            'month' => 'required|integer|min:1|max:12',
            'year' => 'required|integer|min:2000|max:2100',
        ]);

        $startDate = Carbon::createFromDate($request->year, $request->month, 1)->startOfMonth();
        $endDate = $startDate->copy()->endOfMonth();

        $hasils = Monitoring::where('cek_lokasi','sudah')->whereBetween('tanggal', [$startDate, $endDate])->get();

        if ($hasils->isEmpty()) {
            return redirect()->back()->with('error', 'Tidak ada hasil monitoring di bulan tersebut.');
        }

        foreach ($hasils as $hasil) {
            $pdf = PDF::loadView('pdf.berita_acara', compact('hasil'));

            $filename = 'berita_acara_' . $hasil->id . '_' . Str::random(5) . '.pdf';
            $path = 'dokumen/' . $filename;
            Storage::put('public/' . $path, $pdf->output());

            Dokumen::create([
                'nama' => 'Berita Acara ' . $hasil->judul,
                'type' => 'berita_acara',
                'path' => $path,
                'status' => 'draft',
            ]);
        }

        return redirect()->back()->with('success', 'Batch Berita Acara berhasil dibuat.');
    }
}
