<!DOCTYPE html>
<html>
<head>
    <title>Berita Acara</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; font-size: 12px; }
        h2 { text-align: center; }
        p { margin: 5px 0; }
    </style>
</head>
<body>
    <h2>Berita Acara</h2>
    <p><strong>Judul:</strong> {{ $hasil->judul }}</p>
    <p><strong>Tanggal:</strong> {{ \Carbon\Carbon::parse($hasil->tanggal)->format('d-m-Y') }}</p>
    <p><strong>Hasil:</strong> {{ $hasil->hasil ?? '-' }}</p>
</body>
</html>
