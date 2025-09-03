<?php

namespace App\Http\Controllers\Tim;

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
        $query = Dokumen::query();
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%')
                ->orWhere('email', 'like', '%' . $request->search . '%');
        }
        if ($request->filled('status')) {
            $query->orWhere('status', 'like', '%' . $request->status . '%');
        }
        if ($request->filled('type')) {
            $query->orWhere('type', 'like', '%' . $request->type . '%');
        }
        if ($request->filled('sort') && $request->filled('direction')) {
            $query->orderBy($request->sort, $request->direction);
        }
        $typeCounts = (clone $query)->selectRaw('
            SUM(CASE WHEN type = "surat_tugas" THEN 1 ELSE 0 END) as surat_tugas,
            SUM(CASE WHEN type = "berita_acara" THEN 1 ELSE 0 END) as berita_acara
        ')->first();
        $statusCounts = (clone $query)->selectRaw('
            SUM(CASE WHEN status = "draft" THEN 1 ELSE 0 END) as draft,
            SUM(CASE WHEN status = "arsip" THEN 1 ELSE 0 END) as arsip
        ')->first();
        $dokumen = $query->paginate(10)->withQueryString();
        return Inertia::render('tim/dokumen/index', [
            'dokumen' => $dokumen,
            'typeCounts' => [
                'surat_tugas' => $typeCounts->surat_tugas,
                'berita_acara' => $typeCounts->berita_acara,
            ],
            'statusCounts' => [
                'draft' => $statusCounts->draft,
                'arsip' => $statusCounts->arsip,
            ],
            'filter' => $request->only(['search', 'sort', 'direction', 'status', 'type']),
        ]);
    }

    public function show($id)
    {
        $dokumen = Dokumen::findOrFail($id);
        $approval = Approval::where('dokumen_id', $id)->latest()->first();
        return Inertia::render('tim/dokumen/show', [
            'dokumen' => $dokumen,
            'approval' => $approval
        ]);
    }

    // public function requestApproval($id)
    // {
    //     $dokumen = Dokumen::findOrFail($id);
    //     $approval = Approval::where('dokumen_id', $id)->latest()->first();
    //     return Inertia::render('tim/dokumen/request_approval', [
    //         'dokumen' => $dokumen,
    //         'approval' => $approval
    //     ]);
    // }

    // public function sendApproval($id)
    // {
    //     $approval = Approval::where('dokumen_id', $id)->latest()->first();
    //     if ($approval && ($approval->status == '' || $approval->status == 'setuju')) {
    //         return redirect()->back()->with('error', 'Dokumen sudah diajukan untuk approval.');
    //     }
    //     Approval::create([
    //         'dokumen_id' => $id,
    //     ]);
    //     return redirect()->back()->with('success', 'Dokumen berhasil diajukan untuk approval.');
    // }

    // public function generateSuratTugasBatch(Request $request)
    // {
    //     $tahun = $request->tahun;
    //     $bulan = $request->bulan;
    //     $data = Monitoring::whereYear('tanggal', $tahun)->whereMonth('tanggal', $bulan)->get();
    //     $path = 'dokumen/surat_tugas_' . $bulan . '_' . $tahun . '.pdf';
    //     $dokumen = Dokumen::where('path', $path)->first();
    //     if ($dokumen) {
    //         if ($dokumen->status == "draft" || $dokumen->status == "rejected") {
    //             $this->generatePdf($path, 'surat_tugas', $data, $tahun);
    //         }
    //         $dokumen->updated_at = now();
    //         $dokumen->save();
    //     } else {
    //         $this->generatePdf($path, 'surat_tugas', $data, $tahun);
    //         $dokumen = Dokumen::create([
    //             'nama' => 'Surat Tugas ' . $bulan . ' ' . $tahun,
    //             'type' => 'surat_tugas',
    //             'path' => $path,
    //             'status' => 'draft',
    //         ]);
    //     }
    //     return redirect()->route('tim.dokumen.requestApproval', $dokumen->id);
    // }

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

    public function cetakBeritaAcara($id)
    {
        $data = Monitoring::with(['tim.petugasSatu', 'tim.petugasDua', 'reklame', 'tim'])->find($id);
        $filename = 'berita_acara_'.$data->reklame->id_pendaftaran.'.pdf';
        $path = 'dokumen/' . $filename;
        $tahun = Carbon::parse($data->tanggal)->year;
        $this->generatePdf($path, 'berita_acara', $data, $tahun);
        $dokumen = Dokumen::create([
            'nama' => 'Berita Acara ' . $data->reklame->id_pendaftaran,
            'type' => 'berita_acara',
            'path' => $path,
            'status' => 'draft',
        ]);
        return redirect()->route('tim.dokumen.show', $dokumen->id);
        
    }
}
