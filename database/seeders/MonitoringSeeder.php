<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Monitoring;
use Carbon\Carbon;

class MonitoringSeeder extends Seeder
{
    public function run(): void
    {
        $userIds = range(3, 28); // user ID kecuali 1 dan 2
        $reklameIds = range(1, 15); // contoh reklame ID
        $timIds = range(1, 10); // array tim id untuk random tim_id

        for ($i = 0; $i < 10; $i++) {
            $timId = fake()->randomElement($timIds);  // pakai variabel baru untuk random tim_id
            $reklameId = fake()->randomElement($reklameIds);
            $tanggal = Carbon::create(2025, 8, rand(1, 31))->toDateString();

            Monitoring::create([
                'reklame_id' => $reklameId,
                'tim_id' => $timId,
                'tanggal' => $tanggal,
                'cek_lapangan' => fake()->randomElement(['belum', 'sudah']),
                'status' => fake()->randomElement(['berlaku', 'tidak berlaku']),
                'keberadaan_reklame' => fake()->randomElement(['ada', 'tidak ada']),
                'kelayakan_kontruksi' => fake()->randomElement(['layak', 'tidak layak', '-']),
                'kesesuaian' => fake()->randomElement(['sesuai', 'tidak sesuai', '-']),
                'catatan' => fake()->sentence(),
                'tl' => fake()->randomElement(['ya', 'tidak']),
                'created_at' => now(),
            ]);
        }
    }
}
