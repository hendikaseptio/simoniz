<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class TimController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = User::query();

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('sort') && $request->filled('direction')) {
            $query->orderBy($request->sort, $request->direction);
        }
        $query->where('role', 'tim');
        $baseQuery = clone $query;
        $tim = $query->where('role','tim')->paginate(10)->withQueryString();
        $jumlahTimAktif = (clone $baseQuery)->where('status', 'aktif')->count();
        $jumlahTimNonAktif = (clone $baseQuery)->where('status', 'nonaktif')->count();
        return Inertia::render('admin/tim/index', [
            'tim' => $tim,
            'jumlahTimAktif' => $jumlahTimAktif,
            'jumlahTimNonAktif' => $jumlahTimNonAktif,
            'filter' => $request->only(['search', 'sort', 'direction']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/tim/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'tim',
            'status' => 'aktif',
        ]);

        return redirect()->route('admin.tim.index')->with('success', 'User Tim berhasil dibuat');
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
        $tim = User::where('role', 'tim')->findOrFail($id);
        return Inertia::render('admin/tim/edit', [
            'tim' => $tim,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::where('role', 'tim')->findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6|confirmed',
            'status' => 'required|in:aktif,nonaktif',
        ]);

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }
        $user->status = $validated['status'];
        $user->save();

        return redirect()->route('admin.tim.index')->with('success', 'User Tim berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::where('role', 'tim')->findOrFail($id);
        $user->delete();

        return redirect()->route('admin.tim.index')->with('success', 'User Tim berhasil dihapus');
    }
}
