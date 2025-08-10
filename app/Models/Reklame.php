<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reklame extends Model
{
    use HasFactory;

    protected $table = 'reklame';
    protected $fillable = [
        'id_pendaftaran',
        'prev_id_pendaftaran',
        'monitoring',
        'perpanjangan',
        'nama_pemohon',
        'alamat_pemohon',
        'nama_perusahaan',
        'alamat_perusahaan',
        'jalan',
        'isi_konten',
        'tgl_penetapan',
        'tgl_selesai_penetapan',
        'latitude',
        'longitude',
        'lokasi',
        'foto_reklame',
        'no_hp_pemohon',
        'jenis_reklame',
        'jumlah_sisi',
        'keterangan_lokasi',
    ];
}
