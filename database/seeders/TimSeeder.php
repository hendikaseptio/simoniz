<?php

namespace Database\Seeders;

use App\Models\Tim;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TimSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bulanList = [
            'maret', 'april', 'mei', 'juni', 'juli',
            'agustus', 'september', 'oktober', 'november', 'desember',
        ];

        // Daftar ID user yang bisa jadi petugas (hindari id 1 dan 2)
        $petugasIds = range(3, 28); // Sesuaikan jumlah user kamu

        // Buat 10 record acak
        for ($i = 0; $i < 10; $i++) {
            $petugas1 = fake()->randomElement($petugasIds);
            
            // Petugas2 jangan sama dengan petugas1
            do {
                $petugas2 = fake()->randomElement($petugasIds);
            } while ($petugas2 === $petugas1);

            Tim::create([
                'petugas1' => $petugas1,
                'petugas2' => $petugas2,
                'bulan' => $bulanList[$i % count($bulanList)],
                'tahun' => '2024',
                'status' => 'nonaktif',
                'created_at' => now(),
            ]);
        }
        for ($i = 0; $i < 10; $i++) {
            $petugas1 = fake()->randomElement($petugasIds);
            
            // Petugas2 jangan sama dengan petugas1
            do {
                $petugas2 = fake()->randomElement($petugasIds);
            } while ($petugas2 === $petugas1);

            Tim::create([
                'petugas1' => $petugas1,
                'petugas2' => $petugas2,
                'bulan' => 'juli',
                'tahun' => '2025',
                'status' => 'aktif',
                'created_at' => now(),
            ]);
        }
    }
}
