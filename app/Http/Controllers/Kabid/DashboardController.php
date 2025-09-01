<?php

namespace App\Http\Controllers\Kabid;

use App\Http\Controllers\Controller;
use App\Models\Monitoring;
use App\Models\Reklame;
use App\Models\Tim;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index() {
        $reklame = Reklame::with('monitoring')->get();
        $petugas = User::all()->count();
        $tim = Tim::all()->count();
        $monitoring = Monitoring::all()->count();
        return Inertia::render('kabid/dashboard', [
            'reklame' => $reklame,
            'petugas' => $petugas,
            'tim' => $tim,
            'monitoring' => $monitoring,
        ]);
    }
}
