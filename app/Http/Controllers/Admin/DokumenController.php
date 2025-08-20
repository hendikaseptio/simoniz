<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dokumen;
use App\Models\Monitoring;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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

    public function requestApproval()
    {
        $filename = 'dokumen/surat_tugas_2025-08-20.pdf';

        // Cek apakah file ada di storage (default: disk 'public')
        if (Storage::disk('public')->exists($filename)) {
            $dokumen = asset("storage/{$filename}");
        } else {
            $dokumen = null;
        }

        return Inertia::render('admin/dokumen/request_approval', [
            'dokumen' => $dokumen
        ]);
    }

    public function generateSuratTugasBatch(Request $request)
    {
        $data = Monitoring::whereIn('id', $request->jadwal_id)->get();
        $tahun = Carbon::parse($data->first()->tanggal)->year;
        try {
            $pdf = Pdf::loadView('pdf.surat_tugas', compact('data', 'tahun'));

            $filename = 'surat_tugas_' . date('Y-m-d') . '.pdf';
            $path = 'dokumen/' . $filename;
            // Buat folder dokumen jika belum ada
            if (!Storage::exists('public/dokumen')) {
                Storage::disk('public')->makeDirectory('dokumen');
            }

            if (Storage::disk('public')->put($path, $pdf->output())) {
                Log::info("PDF berhasil disimpan di: " . storage_path('app/public/' . $path));
            } else {
                Log::error("Gagal menyimpan PDF ke: " . $path);
            }
        } catch (\Throwable $e) {
            Log::error('Gagal generate PDF: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan saat membuat PDF.',
                'detail' => $e->getMessage(),
            ], 500);
        }
        Dokumen::create([
            'nama' => $filename,
            'type' => 'surat_tugas',
            'path' => $path,
            'status' => 'draft',
        ]);
        return redirect('admin/dokumen/request-approval')->with('success', 'Batch Surat Tugas berhasil dibuat.');
    }

    public function generateBeritaAcaraBatch(Request $request)
    {
        $request->validate([
            'month' => 'required|integer|min:1|max:12',
            'year' => 'required|integer|min:2000|max:2100',
        ]);

        $startDate = Carbon::createFromDate($request->year, $request->month, 1)->startOfMonth();
        $endDate = $startDate->copy()->endOfMonth();

        $hasils = Monitoring::where('cek_lokasi', 'sudah')->whereBetween('tanggal', [$startDate, $endDate])->get();

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
