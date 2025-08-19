import React from 'react';

type BeritaAcaraProps = {
  tanggal: string; // contoh: 'Selasa, 11 Maret 2025'
  nama: string;
  alamatPemohon: string;
  namaPerusahaan: string;
  alamatPerusahaan: string;
  idPendaftaran: string;
  jenisReklame: string;
  tema: string;
  lokasi: string;
  latitude: string | number;
  longitude: string | number;
  masaBerlaku: 'Berlaku' | 'Tidak Berlaku';
  keberadaan: 'Ada' | 'Tidak Ada';
  kelayakan: 'Layak' | 'Tidak Layak';
  kesesuaian: 'Sesuai' | 'Tidak Sesuai';
  catatan: string;
  timTeknis: { nama: string; jabatan: string; tandaTangan?: React.ReactNode }[];
};

export default function BeritaAcara({ 
  tanggal,
  nama,
  alamatPemohon,
  namaPerusahaan,
  alamatPerusahaan,
  idPendaftaran,
  jenisReklame,
  tema,
  lokasi,
  latitude,
  longitude,
  masaBerlaku,
  keberadaan,
  kelayakan,
  kesesuaian,
  catatan,
  timTeknis,
}: BeritaAcaraProps) {
  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif', color: '#000' }}>
      <h2 style={{ textAlign: 'center', textDecoration: 'underline' }}>
        BERITA ACARA MONITORING REKLAME
      </h2>

      <p>
        Pada hari ini <strong>{tanggal}</strong> yang bertanda tangan dibawah ini Tim Teknis Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu Kota Pekalongan, telah melaksanakan monitoring perizinan pada objek Reklame sebagai berikut :
      </p>

      <p><strong>Nama</strong> : {nama}</p>
      <p><strong>Alamat pemohon</strong> : {alamatPemohon}</p>
      <p><strong>Nama perusahaan</strong> : {namaPerusahaan}</p>
      <p><strong>Alamat perusahaan</strong> : {alamatPerusahaan}</p>

      <p><strong>Id Pendaftaran</strong> : {idPendaftaran}</p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20, marginBottom: 20 }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>NO</th>
            <th style={tableHeaderStyle}>JENIS REKLAME</th>
            <th style={tableHeaderStyle}>TEMA</th>
            <th style={tableHeaderStyle}>LOKASI</th>
            <th style={tableHeaderStyle}>TITIK KOORDINAT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tableCellStyle}>1</td>
            <td style={tableCellStyle}>{jenisReklame}</td>
            <td style={tableCellStyle}>{tema}</td>
            <td style={tableCellStyle}>{lokasi}</td>
            <td style={tableCellStyle}>
              <div><strong>LATITUDE:</strong> {latitude}</div>
              <div><strong>LONGITUDE:</strong> {longitude}</div>
            </td>
          </tr>
        </tbody>
      </table>

      <p>Dengan hasil monitoring sebagai berikut :</p>
      <ol>
        <li>Masa berlaku Izin Reklame (<b>{masaBerlaku}</b>)</li>
        <li>Keberadaan Objek Reklame (<b>{keberadaan}</b>)</li>
        <li>Kelayakan Kontruksi (<b>{kelayakan}</b>)</li>
        <li>Kesesuaian Pemasangan Reklame (<b>{kesesuaian}</b>)</li>
        <li>Dokumentasi Terlampir.</li>
      </ol>

      <p><strong>Catatan :</strong></p>
      <p style={{ minHeight: 100, border: '1px solid #000', padding: 10, whiteSpace: 'pre-wrap' }}>
        {catatan}
      </p>

      <p>Demikian Berita acara ini dibuat untuk dapat dipergunakan seperlunya.</p>

      <div style={{ marginTop: 40 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>No</th>
              <th style={tableHeaderStyle}>Nama</th>
              <th style={tableHeaderStyle}>Jabatan/Instansi</th>
              <th style={tableHeaderStyle}>Tanda Tangan</th>
            </tr>
          </thead>
          <tbody>
            {timTeknis.map((tim, i) => (
              <tr key={i}>
                <td style={tableCellStyle}>{i + 1}</td>
                <td style={tableCellStyle}>{tim.nama}</td>
                <td style={tableCellStyle}>{tim.jabatan}</td>
                <td style={tableCellStyle}>&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ fontStyle: 'italic', marginTop: 20 }}>
        Keterangan : * coret yang tidak sesuai
      </p>
    </div>
  );
}

const tableHeaderStyle = {
  border: '1px solid #000',
  padding: 8,
  backgroundColor: '#ddd',
  textAlign: 'center' as const,
};

const tableCellStyle = {
  border: '1px solid #000',
  padding: 8,
  textAlign: 'center' as const,
};
