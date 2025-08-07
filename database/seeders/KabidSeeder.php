<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class KabidSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Kabid Kalem',
            'email' => 'kabid@example.com',
            'password' => Hash::make('kabid123!'),
            'role' => 'kabid',
            'status' => 'aktif',
            'created_at' => now(),
        ]);
    }
}
