<!DOCTYPE html>
<html>

<head>
    <title>Berita Acara</title>
    <style>
        @page {
            size: 210mm 330mm;
            /* Ukuran F4 dalam mm */
            margin: 10mm;
            /* Atur margin sesuai kebutuhan */
        }

        .break {
            page-break-before: always;
        }

        @media print {
            body {
                width: 210mm;
                height: 330mm;
                margin: 0;
            }
        }

        body {
            font-family: "Times New Roman", Times, serif;
            line-height: 1.5;
            /* margin: 40px; */
        }

        .table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
            margin-bottom: 15px;
            font-size: 12px;
        }

        .table th,
        .table td {
            border: 1px solid #000;
            padding: 4px 8px;
            text-align: left;
            vertical-align: top;
        }

        .table th {
            background-color: #f0f0f0;
            font-weight: bold;
        }

        ol {
            margin-top: 0;
            margin-bottom: 0;
            padding-left: 15;
        }
    </style>
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
</head>

<body>
    <img src="/kop.png" width="100%" alt="">
    <div class="center">
        <p class="underline">Surat Tugas</p>
        <p>Nomor : B/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/500.16.7.2/{{$tahun}}</p>
    </div>
    <p>Pada hari ini Selasa Tanggal 22 Bulan Juli Tahun 2025 yang bertanda tangan dibawah ini Tim Teknis Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu Kota Pekalongan, telah melaksanakan monitoring perizinan pada objek Reklame sebagai berikut :</p>
    <table>
        <tr>
            <td>Nama </td>
            <td>:</td>
            <td>{{ $data->reklame->nama_pemohon }}</td>
        </tr>
        <tr>
            <td>Alamat pemohon </td>
            <td>:</td>
            <td>{{ $data->reklame->alamat_pemohon }}</td>
        </tr>
        <tr>
            <td>Nama perusahaan </td>
            <td>:</td>
            <td>{{ $data->reklame->nama_perusahaan }}</td>
        </tr>
        <tr>
            <td>Alamat perusahaan </td>
            <td>:</td>
            <td>{{ $data->reklame->alamat_perusahaan }}</td>
        </tr>
        <tr>
            <td>Id Pendaftaran </td>
            <td>:</td>
            <td>{{ $data->reklame->id_pendaftaran }} </td>
        </tr>
    </table>

    <table class="table">
        <thead>
            <tr>
                <th rowspan="2">NO</th>
                <th rowspan="2">JENIS REKLAME</th>
                <th rowspan="2">TEMA</th>
                <th rowspan="2">LOKASI</th>
                <th colspan="2">TITIK KOORDINAT</th>
            </tr>
            <tr>
                <th>LATITUDE</th>
                <th>LONGITUDE</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>REKLAME TETAP</td>
                <td>{{ $data->reklame->isi_konten }}</td>
                <td>{{ $data->reklame->jalan }}</td>
                <td>{{ $data->reklame->latitude }}</td>
                <td>{{ $data->reklame->longitude }}</td>
            </tr>
        </tbody>
    </table>
    <p>Dengan hasil monitoring sebagai berikut :
    <ol>
        <li>Masa berlaku Izin Reklame (
            @if($data->reklame->tgl_selesai_penetapan < now())
                <del>Berlaku</del> / Tidak Berlaku
                @else
                Berlaku / <del>Tidak Berlaku</del>
                @endif
                )*
        </li>
        <li>Keberadaan Objek Reklame (
            @if($data->keberadaan_reklame == 'ada')
            Ada / <del>Tidak Ada</del>
            @elseif($data->keberadaan_reklame == 'tidak ada')
            <del>Ada</del> / Tidak Ada
            @else
            Ada / Tidak Ada
            @endif
            )*
        </li>
        <li>Kelayakan Kontruksi (
            @if($data->kelayakan_kontruksi == 'layak')
            Layak / <del>Tidak Layak</del>
            @elseif($data->kelayakan_kontruksi == 'tidak layak')
            <del>Layak</del> / Tidak Layak
            @else
            Layak / Tidak Layak
            @endif
            )*
        </li>
        <li>Kesesuian Pemasangan Reklame (
            @if($data->kesesuaian == 'sesuai')
            Sesuai / <del>Tidak Sesuai</del>
            @elseif($data->kesesuaian == 'tidak sesuai')
            <del>Sesuai</del> / Tidak Sesuai
            @else
            Sesuai / Tidak Sesuai
            @endif
            )*
        </li>
        <li>Dokumentasi Terlampir.</li>
    </ol>
    </p>
    <p>Catatan : <br>
        {{ $data->catatan }}
    </p>
    <p>Demikian Berita acara ini dibuat untuk dapat dipergunakan seperlunya.</p>
    <h4>Tim Teknis</h4>
    <table class="table">
        <thead>
            <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Jabatan/Instansi</th>
                <th>Tanda Tanggan</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1.</td>
                <td>@if($data->tim && $data->tim->petugasSatu)
                    {{ $data->tim->petugasSatu->name }}
                    @else
                    -
                    @endif
                </td>
                <td>DPMPTSP Kota Pekalongan</td>
                <td></td>
            </tr>
            <tr>
                <td>2.</td>
                <td>@if($data->tim && $data->tim->petugasDua)
                    {{ $data->tim->petugasDua->name }}
                    @else
                    -
                    @endif
                </td>
                <td>DPMPTSP Kota Pekalongan</td>
                <td></td>
            </tr>
        </tbody>
    </table>
    <p>Keterangan : * coret yang tidak sesuai</p>
    <div class="break"></div>
    <table>
        <tr>
            <th width="50%">Sebelum</th>
            <th width="50%">Sesudah</th>
        </tr>
        <tr>
            <td valign="top">
                <img src="{{ $data->reklame->foto_reklame }}" alt="Foto Monitoring" width="100%">
            </td>
            <td valign="top">
                @if($data->foto)
                <div style="position: relative; width:100%">
                    <img src="{{ asset('storage/' . $data->foto) }}" alt="Foto Monitoring" width="100%">
                    <div style="position: absolute; bottom: 0; padding:10px; ">
                        <div style="display: flex; justify-content: start; align-items: center; gap: 10px padding: 10px; background-color: #00000060; border-radius: 10px; color: white; width: 100%">
                            <div id="map" style="height: 80px; width: 100%; border-rounded: 10px"></div>
                            <p>{{ $alamat['display_name'] }} <br>
                                Lat {{ $data->latitude }}, Long {{ $data->longitude }}
                            </p>
                        </div>
                    </div>
                </div>
                @else
                <p>Tidak ada foto</p>
                @endif
            </td>
        </tr>
    </table>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var map = L.map('map',{zoomControl: false }).setView([<?=  $data->latitude ?>, <?= $data->longitude ?>], 10);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);
            L.marker([<?=  $data->latitude ?>, <?= $data->longitude ?>]).addTo(map)
        });
    </script>

    <hr>
    <?php dd($data) ?>
</body>

</html>