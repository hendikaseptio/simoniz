<!DOCTYPE html>
<html>
<head>
    <title>Surat Tugas</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; font-size: 12px; }
        h2 { text-align: center; }
        p { margin: 5px 0; }
    </style>
</head>
<body>
    @foreach ($jadwals as $jadwal)
    <h2>Surat Tugas</h2>
    <p><strong>Nama Kegiatan:</strong> {{ $jadwal->judul }}</p>
    <p><strong>Tanggal:</strong> {{ \Carbon\Carbon::parse($jadwal->tanggal)->format('d-m-Y') }}</p>
    <p><strong>Tempat:</strong> {{ $jadwal->lokasi }}</p>
    <p><strong>Deskripsi:</strong> {{ $jadwal->deskripsi ?? '-' }}</p>
    @endforeach
</body>
</html>
