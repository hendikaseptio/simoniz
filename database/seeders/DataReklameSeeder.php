<?php

namespace Database\Seeders;

use App\Models\Reklame;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DataReklameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'id_pendaftaran' => 210,
                'prev_id_pendaftaran' => null,
                'monitoring' => 'iya',
                'perpanjangan' => 'belum',
                'nama_pemohon' => 'ADHITYA MEIKA',
                'alamat_pemohon' => 'GG. PUCUNG 3/60 NGROPOH RT.002 RW.023 KEL. CONDONGCATUR KEC. DEPOK KAB. SLEMAN',
                'nama_perusahaan' => 'CV. KARO PRODUCTION',
                'alamat_perusahaan' => 'JL. WAHID HASYIM NO. 47 WARINGINSARI KEL. CONDONGCATUR KEC. DEPOK KAB. SLEMAN',
                'jalan' => 'Jl. Gajah Mada',
                'isi_konten' => 'GRAB',
                'tgl_penetapan' => '2023-04-03',
                'tgl_selesai_penetapan' => '2024-10-04',
                'latitude' => -6.8891151,
                'longitude' => 109.6619281,
                'lokasi' => 'https://www.google.com/maps/place/-6.889115072401157,109.66192814132118',
                'foto_reklame' => 'https://sakpore.pekalongankota.go.id/foto_reklame/a596b5719480c60a14b03b31498882a1.jpg',
                'no_hp_pemohon' => '087738215117',
                'jenis_reklame' => 'BILLBOARD TANAH NEGARA',
                'jumlah_sisi' => 1,
                'keterangan_lokasi' => null,
            ],
            [
                'id_pendaftaran' => 211,
                'prev_id_pendaftaran' => null,
                'monitoring' => 'tidak',
                'perpanjangan' => 'sudah',
                'nama_pemohon' => 'DIAN PRATAMA',
                'alamat_pemohon' => 'JL. MELATI NO. 12, SEMARANG',
                'nama_perusahaan' => 'PT. DIAN MEDIA',
                'alamat_perusahaan' => 'JL. MELATI NO. 12, SEMARANG',
                'jalan' => 'Jl. Diponegoro',
                'isi_konten' => 'PROMO AGUSTUS',
                'tgl_penetapan' => '2024-01-15',
                'tgl_selesai_penetapan' => '2025-01-15',
                'latitude' => -6.9900012,
                'longitude' => 110.4200005,
                'lokasi' => 'https://maps.google.com/?q=-6.9900012,110.4200005',
                'foto_reklame' => 'foto_reklame/promo1.jpg',
                'no_hp_pemohon' => '081234567890',
                'jenis_reklame' => 'SPANDUK',
                'jumlah_sisi' => 2,
                'keterangan_lokasi' => 'Dekat lampu merah',
            ],
            [
                'id_pendaftaran' => 212,
                'prev_id_pendaftaran' => null,
                'monitoring' => 'iya',
                'perpanjangan' => 'kosong',
                'nama_pemohon' => 'RINA DEWI',
                'alamat_pemohon' => 'JL. MAWAR NO. 5, PEKALONGAN',
                'nama_perusahaan' => 'CV. INDO VISUAL',
                'alamat_perusahaan' => 'JL. MAWAR NO. 5, PEKALONGAN',
                'jalan' => 'Jl. Sudirman',
                'isi_konten' => 'IKLAN MINUMAN',
                'tgl_penetapan' => '2023-12-01',
                'tgl_selesai_penetapan' => '2024-12-01',
                'latitude' => -6.8912345,
                'longitude' => 109.6643210,
                'lokasi' => 'https://maps.google.com/?q=-6.8912345,109.6643210',
                'foto_reklame' => 'foto_reklame/iklan_minuman.jpg',
                'no_hp_pemohon' => '082112345678',
                'jenis_reklame' => 'BALIHO',
                'jumlah_sisi' => 1,
                'keterangan_lokasi' => null,
            ],
            [
                'id_pendaftaran' => 213,
                'prev_id_pendaftaran' => 211,
                'monitoring' => 'kosong',
                'perpanjangan' => 'belum',
                'nama_pemohon' => 'ALDI RAMADHAN',
                'alamat_pemohon' => 'JL. KENANGA NO. 9, KUDUS',
                'nama_perusahaan' => 'PT. KUDUS VISUAL',
                'alamat_perusahaan' => 'JL. KENANGA NO. 9, KUDUS',
                'jalan' => 'Jl. S. Parman',
                'isi_konten' => 'DISKON SPESIAL',
                'tgl_penetapan' => '2025-01-10',
                'tgl_selesai_penetapan' => '2026-01-10',
                'latitude' => -6.8012345,
                'longitude' => 110.8398765,
                'lokasi' => 'https://maps.google.com/?q=-6.8012345,110.8398765',
                'foto_reklame' => 'foto_reklame/diskon.jpg',
                'no_hp_pemohon' => '089912345678',
                'jenis_reklame' => 'NEON BOX',
                'jumlah_sisi' => 2,
                'keterangan_lokasi' => 'Simpang tiga pasar',
            ],
            [
                'id_pendaftaran' => 214,
                'prev_id_pendaftaran' => null,
                'monitoring' => 'iya',
                'perpanjangan' => 'sudah',
                'nama_pemohon' => 'SRI WAHYUNI',
                'alamat_pemohon' => 'JL. ANGGREK NO. 2, TEGAL',
                'nama_perusahaan' => 'CV. TEGAL ADVERTISING',
                'alamat_perusahaan' => 'JL. ANGGREK NO. 2, TEGAL',
                'jalan' => 'Jl. Veteran',
                'isi_konten' => 'IKLAN SEMINAR',
                'tgl_penetapan' => '2024-06-01',
                'tgl_selesai_penetapan' => '2025-06-01',
                'latitude' => -6.8888888,
                'longitude' => 109.6666666,
                'lokasi' => 'https://maps.google.com/?q=-6.8888888,109.6666666',
                'foto_reklame' => 'foto_reklame/seminar.jpg',
                'no_hp_pemohon' => '085612345678',
                'jenis_reklame' => 'X-BANNER',
                'jumlah_sisi' => 1,
                'keterangan_lokasi' => 'Depan gedung pertemuan',
            ],
        ];
        foreach ($data as $item) {
            Reklame::create($item);
        }
    }
}
