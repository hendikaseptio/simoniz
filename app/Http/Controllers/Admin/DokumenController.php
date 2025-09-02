<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Approval;
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
    public function index(Request $request)
    {
        // $dokumen = Dokumen::latest()->paginate(10);
        $query = Dokumen::query();
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%')
                ->orWhere('email', 'like', '%' . $request->search . '%');
        }
        $typeCounts = (clone $query)->selectRaw('
            SUM(CASE WHEN type = "surat_tugas" THEN 1 ELSE 0 END) as surat_tugas,
            SUM(CASE WHEN type = "berita_acara" THEN 1 ELSE 0 END) as berita_acara
        ')->first();
        $dokumen = $query->paginate(10)->withQueryString();
        return Inertia::render('admin/dokumen/index', [
            'dokumen' => $dokumen,
            'type' => [
                'surat_tugas' => $typeCounts->surat_tugas,
                'berita_acara' => $typeCounts->berita_acara,
            ],
        ]);
    }

    public function show($id)
    {
        $dokumen = Dokumen::findOrFail($id);
        $approval = Approval::where('dokumen_id', $id)->latest()->first();
        return Inertia::render('admin/dokumen/show', [
            'dokumen' => $dokumen,
            'approval' => $approval
        ]);
    }

    public function requestApproval($id)
    {
        $dokumen = Dokumen::findOrFail($id);
        $approval = Approval::where('dokumen_id', $id)->latest()->first();
        
        return Inertia::render('admin/dokumen/request_approval', [
            'dokumen' => $dokumen,
            'approval' => $approval
        ]);
    }

    public function sendApproval($id)
    {
        $approval = Approval::where('dokumen_id', $id)->latest()->first();
        if ($approval && ($approval->status == '' || $approval->status == 'setuju')) {
            return redirect()->back()->with('error', 'Dokumen sudah diajukan untuk approval.');
        }
        Approval::create([
            'dokumen_id' => $id,
        ]);

        return redirect()->back()->with('success', 'Dokumen berhasil diajukan untuk approval.');
    }

    public function generateSuratTugasBatch(Request $request)
    {
        $tahun = $request->tahun;
        $bulan = $request->bulan;
        $data = Monitoring::whereYear('tanggal', $tahun)->whereMonth('tanggal', $bulan)->get();

        $path = 'dokumen/surat_tugas_' . $bulan . '_' . $tahun . '.pdf';
        $dokumen = Dokumen::where('path', $path)->first();
        if ($dokumen) {
            if ($dokumen->status == "draft" || $dokumen->status == "rejected") {
                $this->generatePdf($path, 'surat_tugas', $data, $tahun);
            }
            $dokumen->updated_at = now();
            $dokumen->save();
        } else {
            $this->generatePdf($path, 'surat_tugas', $data, $tahun);
            $dokumen = Dokumen::create([
                'nama' => 'Surat Tugas ' . $bulan . ' ' . $tahun,
                'type' => 'surat_tugas',
                'path' => $path,
                'status' => 'draft',
            ]);
        }
        return redirect()->route('admin.dokumen.requestApproval', $dokumen->id);
    }

    function generatePdf($path, $type, $data, $tahun)
    {
        try {
            $pdf = Pdf::loadView('pdf.' . $type, compact('data', 'tahun'));
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
            return redirect()->back()->with('error', 'Gagal generate PDF: ' . $e->getMessage());
        }
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
