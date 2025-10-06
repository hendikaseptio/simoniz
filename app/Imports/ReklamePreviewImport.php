<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithMapping;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class ReklamePreviewImport implements ToCollection, WithHeadingRow, WithMapping
{
    public $rows;

    public function collection(Collection $collection)
    {
        $this->rows = $collection;
    }

    public function map($row): array
    {
        return [
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

            // 🔥 Konversi tanggal dengan pengecekan tipe data
            'tgl_penetapan' => $this->convertExcelDate($row['tgl_penetapan']),
            'tgl_selesai_penetapan' => $this->convertExcelDate($row['tgl_selesai_penetapan']),

            'latitude' => $row['latitude'],
            'longitude' => $row['longitude'],
            'lokasi' => $row['lokasi'],
            'foto_reklame' => $row['foto_reklame'],
            'no_hp_pemohon' => $row['no_hp_pemohon'],
            'jenis_reklame' => $row['jenis_reklame'],
            'jumlah_sisi' => $row['jumlah_sisi'],
            'keterangan_lokasi' => $row['keterangan_lokasi'],
        ];
    }

    private function convertExcelDate($value)
    {
        if (is_numeric($value)) {
            return Date::excelToDateTimeObject($value)->format('Y-m-d');
        }

        // Jika string, coba parse manual dari format dd/mm/yyyy atau d/m/yyyy
        try {
            return \Carbon\Carbon::createFromFormat('d/m/Y', $value)->format('Y-m-d');
        } catch (\Exception $e) {
            return null; // atau tetap return $value jika mau simpan original
        }
    }
}
