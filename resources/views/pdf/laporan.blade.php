@php
use Carbon\Carbon;
$namaBulan = [
    1 => 'Januari',
    2 => 'Februari',
    3 => 'Maret',
    4 => 'April',
    5 => 'Mei',
    6 => 'Juni',
    7 => 'Juli',
    8 => 'Agustus',
    9 => 'September',
    10 => 'Oktober',
    11 => 'November',
    12 => 'Desember',
];
@endphp
<!DOCTYPE html>
<html>

<head>
    <title>Surat Tugas</title>
    <style>
        @page {
            size: 330mm 210mm;
            /* Ukuran F4 dalam mm */
            margin: 10mm;
            /* Atur margin sesuai kebutuhan */
        }

        .break {
            page-break-before: always;
        }

        @media print {
            body {
                height: 210mm;
                width: 330mm;
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
            font-size: 10px;
        }

        .table th,
        .table td {
            border: 1px solid #000;
            padding: 2px 4px;
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
        .uppercase  {
            text-transform: uppercase;
        }
    </style>
</head>

<body>
    <p class="center">REKAPITULASI DATA PEMANTAUAN PERIZINAN</p>
    <p class="center">BULAN {{ $namaBulan[$bulan] }} TAHUN {{ $tahun }}</p>

    <table class="table">
        <thead>
            <tr>
                <th>NO</th>
                <th>TIM JALAN </th>
                <th>TANGGAL </th>
                <th>ID PENDAFTARAN /NIB </th>
                <th>PERUSAHAAN </th>
                <th>TEMA </th>
                <th>JALAN </th>
                <th>CEK LAPANGA</th>
            </tr>
        </thead>
        <tbody>
            @php 
            $no = 1; 
            @endphp
            @foreach ($data as $r)
            <tr>
                <td>{{ $no++ }}</td>
                <td>{{ $r->tim->petugasSatu->name }} <br> {{ $r->tim->petugasDua->name }} </td>
                <td>{{ Carbon::parse($r->tanggal)->format('d-m-Y') }}</td>
                <td>{{ $r->reklame->id_pendaftaran}}</td>
                <td class="uppercase">{{ $r->reklame->nama_perusahaan }}</td>
                <td class="uppercase">{{ $r->reklame->isi_konten }}</td>
                <td class="uppercase">{{ $r->reklame->jalan }}</td>
                <td class="uppercase">{{ $r->cek_lapangan }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
    <table style="width: 100%;">
        <tr>
            <td style="width: 30%;"></td>
            <td style="width: 70%;">
                <div class="center" style="line-height: 1;">
                    <p>
                        Pekalongan, {{ \Carbon\Carbon::parse($tanggal_surat)->locale('id')->translatedFormat('d F Y') }}
                    </p>
                    <p><strong>Plt.KEPALA DINAS PENANAMAN MODAL DAN<br>
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