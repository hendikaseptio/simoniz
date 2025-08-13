<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class PetugasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            ['name' => 'Beno Heritriono', 'firstname' => 'beno'],
            ['name' => 'Arif Karyadi', 'firstname' => 'arif'],
            ['name' => 'Sukirno', 'firstname' => 'sukirno'],
            ['name' => 'Amat Muslich', 'firstname' => 'muslich'],
            ['name' => 'Muhammad Muzni Kharis', 'firstname' => 'muzni'],
            ['name' => 'Purnomo', 'firstname' => 'purnomo'],
            ['name' => 'Noor Falaisifa', 'firstname' => 'sifa'],
            ['name' => 'Ratih Prasastianila Muna', 'firstname' => 'ratih'],
            ['name' => 'Abdul Kholis', 'firstname' => 'kholis'],
            ['name' => 'Julio Odi Ardika', 'firstname' => 'julio'],
            ['name' => 'Hendika Septio Afitdin', 'firstname' => 'hendika'],
            ['name' => 'Achmad Adi Kusuma', 'firstname' => 'adi'],
            ['name' => 'Yania Noviantika LS', 'firstname' => 'yania'],
            ['name' => 'Muhammad Rifqil Anam', 'firstname' => 'rifqil'],
            ['name' => 'Ermi Susanti', 'firstname' => 'ermi'],
            ['name' => 'Moh. Dany Rozid Wafa', 'firstname' => 'dani'],
            ['name' => 'Feyza Uki Syafana', 'firstname' => 'feyza'],
            ['name' => 'Florecinta Tabah Al Karomah', 'firstname' => 'tata'],
            ['name' => 'Wulan Suryani', 'firstname' => 'wulan'],
            ['name' => 'Dessy Ratna Palupi', 'firstname' => 'dessy'],
            ['name' => 'Rara Qorina', 'firstname' => 'rara'],
            ['name' => 'Dwita Gladea', 'firstname' => 'dea'],
            ['name' => 'Fajariawan Prabowo', 'firstname' => 'fajar'],
            ['name' => 'Muhammad Faqih Iqbal', 'firstname' => 'faqih'],
            ['name' => 'M. Yusril Al Fikri', 'firstname' => 'yusril'],
            ['name' => 'Aqilatul Ulya', 'firstname' => 'ela'],
        ];

        foreach ($users as $user) {
            User::create([
                'name' => $user['name'],
                'email' => $user['firstname'] . '@example.com',
                'password' => Hash::make($user['firstname'] . '123!'),
                'role' => 'tim',
                'status' => 'aktif',
                'created_at' => now(),
            ]);
        }
    }
}
