<?php

namespace App\Http\Controllers\Kabid;

use App\Http\Controllers\Controller;
use App\Models\Approval;
use App\Models\Dokumen;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApprovalController extends Controller
{
    public function index(Request $request)
    {
        // $approval = Dokumen::latest()->where('status', '')->paginate(10);

        $query = Approval::query()->with(['dokumen']);

        if ($request->filled('search')) {
            $query->where('status', 'like', '%' . $request->search . '%');
        }
        $approval = $query->paginate(10)->withQueryString();

        return Inertia::render('kabid/approval/index', [
            'approval' => $approval
        ]);
    }
    public function edit($id)
    {
        $approval = Approval::find($id);
        $dokumen = Dokumen::find($approval->id);
         return Inertia::render('kabid/approval/edit', [
            'dokumen' => $dokumen,
            'approval' => $approval
        ]);
    }
    public function update(Request $request, string $id)
    {
        $request->validate([
            'status' => 'required|in:setuju,tidak setuju',
            'catatan' => 'required|string',
        ]);
        $approval = Approval::find($id);
        $approval->tanggal_approval = now();
        $approval->status = $request->status;
        $approval->catatan = $request->catatan;
        $approval->save();

        $dokumen = Dokumen::find($approval->dokumen_id);
        $dokumen->status = 'arsip';
        $dokumen->save();
        return redirect()->route('kabid.approval.index');
    }
}
