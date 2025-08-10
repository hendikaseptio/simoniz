<?php

namespace App\Imports;

use App\Models\Reklame;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ReklameImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Reklame([
            'id_pendaftaran' => $row['id_pendaftaran'],
            'prev_id_pendaftaran' => $row['prev_id_pendaftaran'],
            'monitoring' => $row['monitoring'],
            'perpanjangan' => $row['perpanjangan'],
            'nama_pemohon' => $row['nama_pemohon'],
            'alamat_pemohon' => $row['alamat_pemohon'],
            'nama_perusahaan' => $row['nama_perusahaan'],
            'alamat_perusahaan' => $row['alamat_perusahaan'],
            'jalan' => $row['jalan'],
            'isi_konten' => $row['isi_konten'],
            'tgl_penetapan' => $row['tgl_penetapan'],
            'tgl_selesai_penetapan' => $row['tgl_selesai_penetapan'],
            'latitude' => $row['latitude'],
            'longitude' => $row['longitude'],
            'lokasi' => $row['lokasi'],
            'foto_reklame' => $row['foto_reklame'],
            'no_hp_pemohon' => $row['no_hp_pemohon'],
            'jenis_reklame' => $row['jenis_reklame'],
            'jumlah_sisi' => $row['jumlah_sisi'],
            'keterangan_lokasi' => $row['keterangan_lokasi'],
        ]);
    }
}
