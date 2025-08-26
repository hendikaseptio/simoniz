<?php

namespace App\Http\Controllers\Kabid;

use App\Http\Controllers\Controller;
use App\Models\Dokumen;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DokumenController extends Controller
{
    public function index()
    {
        $dokumen = Dokumen::latest()->paginate(10);

        return Inertia::render('kabid/dokumen/index', [
            'dokumen' => $dokumen
        ]);
    }
}
