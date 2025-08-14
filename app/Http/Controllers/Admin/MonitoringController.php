<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Monitoring;
use App\Models\Tim;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MonitoringController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Monitoring::query()->with(['tim.petugasSatu', 'tim.petugasDua', 'reklame']);

        if ($request->filled('search')) {
            $query->where('tim_st', 'like', '%' . $request->search . '%')
                ->orWhere('reklame_id', $request->search);
        }

        if ($request->filled('sort') && $request->filled('direction')) {
            $query->orderBy($request->sort, $request->direction);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $monitoring = $query->paginate(10)->through(function ($item) {
            $item->tim_st_names_string = $item->tim_st_names_string;
            return $item;
        })->withQueryString();
        $tim = Tim::with(['petugasSatu', 'petugasDua'])->where('status', 'aktif')->get();
        return Inertia::render('admin/monitoring/index', [
            'monitoring' => $monitoring,
            'tim' => $tim,
            'filters' => $request->only(['search', 'sort', 'direction']),
        ]);
        return Inertia::render('admin/monitoring/index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/monitoring/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {   
        $monitoring = Monitoring::findOrFail($id);
        return Inertia::render('admin/monitoring/edit',[
            'monitoring' => $monitoring
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
