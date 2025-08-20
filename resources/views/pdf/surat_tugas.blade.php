@php
use Carbon\Carbon;
@endphp
<!DOCTYPE html>
<html>

<head>
    <title>Surat Tugas</title>
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

        .center {
            text-align: center;
            font-weight: bold;
            text-transform: uppercase;
        }

        .underline {
            text-decoration: underline;
        }

        .section-title {
            font-weight: bold;
            margin-top: 20px;
        }

        .indent {
            text-indent: 30px;
        }

        table {
            margin-top: 10px;
            margin-bottom: 10px;
        }

        .signature {
            display: flex;
            justify-content: end;
            line-height: 1;
            text-align: left;
            margin-top: 30px;
        }

        .right {
            display: flex;
            justify-content: end;
            text-align: left;
            margin-top: 30px;
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
        }
    </style>
</head>

<body>
    <img src="/public/kop.png" width="100%" alt="">
    <div class="center">
        <p class="underline">Surat Tugas</p>
        <p>Nomor : B/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/500.16.7.2/{{$tahun}}</p>

    </div>

    <p class="center">KEPALA DINAS PENANAMAN MODAL DAN PELAYANAN TERPADU SATU PINTU<br>
        KOTA PEKALONGAN</p>

    <table>
        <tr>
            <td valign="top">Dasar</td>
            <td valign="top">:</td>
            <td valign="top">
                <ol>
                    <li>Peraturan Daerah Nomor 11 Tahun 2024 tentang Anggaran Pendapatan dan Belanja Daerah Kota Pekalongan Tahun Anggaran 2025 (Lembaran Daerah Tahun 2024 Nomor 11);</li>
                    <li>Peraturan Wali Kota Pekalongan Nomor 72 Tahun 2021 Tanggal 24 November 2021 tentang Kedudukan, Susunan Organisasi, Tugas dan Fungsi Serta Tata Kerja Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu (Berita Daerah Tahun 2021 Nomor 72);</li>
                    <li>Peraturan Wali Kota Pekalongan Nomor 20 Tahun 2024 Tentang Standar Harga Satuan di Lingkungan Pemerintah Kota Pekalongan Tahun Anggaran 2025;</li>
                    <li>Peraturan Wali Kota Nomor 47 Tahun 2024 tanggal 27 Desember 2024 tentang Penjabaran Anggaran Pendapatan dan Belanja Daerah Kota Pekalongan Tahun Anggaran 2025 (Berita Daerah Nomor 48 Tahun 2024);</li>
                </ol>
            </td>
        </tr>
    </table>
    <p class="center">Menugaskan</p>
    <table>
        <tr>
            <td valign="top">Kepada</td>
            <td valign="top">:</td>
            <td valign="top"></td>
        </tr>
    </table>
    <p class="center">( Nama Terlampir )</p>
    <table>
        <tr>
            <td valign="top">Untuk</td>
            <td valign="top">:</td>
            <td valign="top">
                <ol>
                    <li>Melaksanakan Monitoring Data Perizinan Pelaku Usaha yang telah mengikuti Penyuluhan Keamanan Pangan Bulan Agustus 2025.</li>
                    <li>Melaporkan Hasil Pelaksanaan Tugas kepada Pejabat Pemberi Tugas.</li>
                    <li>Perintah ini dilaksanakan dengan penuh tanggung jawab.</li>
                    <li>Apabila terdapat kekeliruan dalam Surat Perintah Tugas ini akan diadakan perbaikan kembali sebagaimana mestinya.</li>
                </ol>
            </td>
        </tr>
    </table>
    <table style="width: 100%;">
        <tr>
            <td style="width: 50%;"></td>
            <td style="width: 50%;">
                <div class="center" style="line-height: 1;">
                    <p>Pekalongan, {{ Carbon::now()->translatedFormat('d F Y') }}</p>
                    <p><strong>KEPALA DINAS PENANAMAN MODAL DAN<br>
                            PELAYANAN TERPADU SATU PINTU</strong></p>
                    <br><br><br>
                    <p><u>ARIF KARYADI, S. Sos.</u><br>
                        <small>Pembina Utama Muda</small><br>
                        NIP. 197110171999031007
                    </p>
                </div>
            </td>
        </tr>
    </table>
    <div class="break"></div>
    <table style="width: 100%;">
        <tr>
            <td style="width: 65%;"></td>
            <td style="width: 35%;">
                <table>
                    <tr>
                        <td>Lampiran I</td>
                    </tr>
                    <tr>
                        <td>Nomor</td>
                        <td>:</td>
                        <td>B/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/500.16.7.2/{{$tahun}}</td>
                    </tr>
                    <tr>
                        <td>Perihal</td>
                        <td>:</td>
                        <td>Surat Tugas</td>
                    </tr>
                    <tr>
                        <td>Tanggal</td>
                        <td>:</td>
                        <td>{{ Carbon::now()->translatedFormat('d F Y') }}</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>


    <p class="center"><b>PETUGAS MONITORING DATA PERIZINAN IZIN REKLAME TETAP</b></p>
    <table class="table">
        <thead>
            <tr>
                <th>NO</th>
                <th>NAMA</th>
                <th>TANGGAL</th>
                <th>PERUSAHAAN</th>
                <th>TEMA</th>
                <th>JALAN</th>
            </tr>
        </thead>
        <tbody>
            @php
            $no=1;
            @endphp
            @foreach ($data as $r)
            <tr>
                <td>{{ $no++ }}</td>
                <td>{{ $r->tim->petugasSatu->name }} <br> {{ $r->tim->petugasDua->name }}</td>
                <td>{{ \Carbon\Carbon::parse($r->tanggal)->format('d-m-Y') }}</td>
                <td>{{ $r->reklame->nama_perusahaan }}</td>
                <td>{{ $r->reklame->isi_konten }}</td>
                <td>{{ $r->reklame->jalan }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
    <table style="width: 100%;">
        <tr>
            <td style="width: 50%;"></td>
            <td style="width: 50%;">
                <div class="center" style="line-height: 1;">
                    <p>Pekalongan, {{ Carbon::now()->translatedFormat('d F Y') }}</p>
                    <p><strong>KEPALA DINAS PENANAMAN MODAL DAN<br>
                            PELAYANAN TERPADU SATU PINTU</strong></p>
                    <br><br><br>
                    <p><u>ARIF KARYADI, S. Sos.</u><br>
                        <small>Pembina Utama Muda</small><br>
                        NIP. 197110171999031007
                    </p>
                </div>
            </td>
        </tr>
    </table>
</body>

</html>