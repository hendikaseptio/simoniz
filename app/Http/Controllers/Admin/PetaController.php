<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reklame;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PetaController extends Controller
{
    public function index(Request $request)
    {
        $reklame = Reklame::all();
        return Inertia::render('admin/peta/index', [
            'reklame' => $reklame,
        ]);
    }
}
