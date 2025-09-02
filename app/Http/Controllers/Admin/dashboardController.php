<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Monitoring;
use App\Models\Reklame;
use App\Models\Tim;
use App\Models\User;
use Inertia\Inertia;

class dashboardController extends Controller
{
    public function index() {
        $reklame = Reklame::with('monitoring')->get();
        $petugas = User::all()->count();
        $tim = Tim::all()->count();
        $monitoring = Monitoring::all()->count();
        return Inertia::render('admin/dashboard', [
            'reklame' => $reklame,
            'petugas' => $petugas,
            'tim' => $tim,
            'monitoring' => $monitoring,
        ]);
    }
}
