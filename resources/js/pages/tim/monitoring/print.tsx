import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';

export default function Print() {
    const { data, tahun, alamat } = usePage().props;
    useEffect(() => {
        window.print();
    }, []);
    const markerIconHijau = new L.Icon({
        iconUrl: '/marker/marker1.png',
        iconSize: [24, 35],
        iconAnchor: [12, 10],
    });
    const ResizeMap = () => {
        const map = useMap();

        useEffect(() => {
            setTimeout(() => {
                map.invalidateSize();
            }, 100); // delay sedikit biar container udah kelihatan
        }, [map]);

        return null;
    };
    return (
        <>
            <div className="prose bg-white p-4">
                <img src="/kop.png" width="100%" alt="" />
                <div className="my-4 text-center">
                    <h3 className="text-lg font-bold">BERITA ACARA MONITORING REKLAME</h3>
                    <p>Nomor : B/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/500.16.7.2/ {tahun}</p>
                </div>
                <p>
                    Pada hari ini Selasa Tanggal 22 Bulan Juli Tahun 2025 yang bertanda tangan dibawah ini Tim Teknis Dinas Penanaman Modal dan
                    Pelayanan Terpadu Satu Pintu Kota Pekalongan, telah melaksanakan monitoring perizinan pada objek Reklame sebagai berikut :
                </p>
                <table className="w-full table-auto text-sm mb-2">
                    <tbody>
                        <tr>
                            <td valign="top" className="pr-3" width={130}>
                                Nama
                            </td>
                            <td valign="top" className="px-3">
                                :
                            </td>
                            <td valign="top" className="px-3">
                                {data.reklame.nama_pemohon}
                            </td>
                        </tr>
                        <tr>
                            <td valign="top" className="pr-3">
                                Alamat Pemohon
                            </td>
                            <td valign="top" className="px-3">
                                :
                            </td>
                            <td valign="top" className="px-3">
                                {data.reklame.alamat_pemohon}
                            </td>
                        </tr>
                        <tr>
                            <td valign="top" className="pr-3">
                                Nama Perusahaan
                            </td>
                            <td valign="top" className="px-3">
                                :
                            </td>
                            <td valign="top" className="px-3">
                                {data.reklame.nama_perusahaan}
                            </td>
                        </tr>
                        <tr>
                            <td valign="top" className="pr-3">
                                Alamat Perusahaan
                            </td>
                            <td valign="top" className="px-3">
                                :
                            </td>
                            <td valign="top" className="px-3">
                                {data.reklame.alamat_perusahaan}
                            </td>
                        </tr>
                        <tr>
                            <td valign="top" className="pr-3">
                                ID Pendaftaran
                            </td>
                            <td valign="top" className="px-3">
                                :
                            </td>
                            <td valign="top" className="px-3">
                                {data.reklame.id_pendaftaran}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table className="mb-3 w-full table-auto border-2 border-black text-sm">
                    <thead>
                        <tr>
                            <th rowSpan={2} className="border-2 border-black px-2 py-1 text-left">
                                No
                            </th>
                            <th rowSpan={2} className="border-2 border-black px-2 py-1 text-left">
                                Jenis Reklame
                            </th>
                            <th rowSpan={2} className="border-2 border-black px-2 py-1 text-left">
                                Tema
                            </th>
                            <th rowSpan={2} className="border-2 border-black px-2 py-1 text-left">
                                Lokasi
                            </th>
                            <th colSpan={2} className="border-2 border-black px-2 py-1 text-left">
                                Titik Koordinat
                            </th>
                        </tr>
                        <tr>
                            <th className="border-2 border-black px-2 py-1 text-left">Latitude</th>
                            <th className="border-2 border-black px-2 py-1 text-left">Longitude</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td valign="top" className="border-2 border-black px-2 py-1">
                                1
                            </td>
                            <td valign="top" className="border-2 border-black px-2 py-1">
                                REKLAME TETAP
                            </td>
                            <td valign="top" className="border-2 border-black px-2 py-1">
                                {data.reklame.isi_konten}
                            </td>
                            <td valign="top" className="border-2 border-black px-2 py-1">
                                {data.reklame.jalan}
                            </td>
                            <td valign="top" className="border-2 border-black px-2 py-1">
                                {data.reklame.latitude}
                            </td>
                            <td valign="top" className="border-2 border-black px-2 py-1">
                                {data.reklame.longitude}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p>Dengan hasil monitoring sebagai berikut:</p>
                <table>
                    <tbody>
                        <tr>
                            <td className="pr-2">1. </td>
                            <td className="pr-2">
                                Masa berlaku Izin Reklame (
                                {new Date(data.reklame.tgl_selesai_penetapan) < new Date() ? (
                                    <>
                                        <del>Berlaku</del> / Tidak Berlaku
                                    </>
                                ) : (
                                    <>
                                        Berlaku / <del>Tidak Berlaku</del>
                                    </>
                                )}
                                )*
                            </td>
                        </tr>
                        <tr>
                            <td className="pr-2">2. </td>
                            <td className="pr-2">
                                Keberadaan Objek Reklame (
                                {data.keberadaan_reklame === 'ada' ? (
                                    <>
                                        Ada / <del>Tidak Ada</del>
                                    </>
                                ) : data.keberadaan_reklame === 'tidak ada' ? (
                                    <>
                                        <del>Ada</del> / Tidak Ada
                                    </>
                                ) : (
                                    <>Ada / Tidak Ada</>
                                )}
                                )*
                            </td>
                        </tr>
                        <tr>
                            <td className="pr-2">3. </td>
                            <td className="pr-2">
                                Kelayakan Kontruksi (
                                {data.kelayakan_kontruksi === 'layak' ? (
                                    <>
                                        Layak / <del>Tidak Layak</del>
                                    </>
                                ) : data.kelayakan_kontruksi === 'tidak layak' ? (
                                    <>
                                        <del>Layak</del> / Tidak Layak
                                    </>
                                ) : (
                                    <>Layak / Tidak Layak</>
                                )}
                                )*
                            </td>
                        </tr>
                        <tr>
                            <td className="pr-2">4. </td>
                            <td className="pr-2">
                                Kesesuaian Pemasangan Reklame (
                                {data.kesesuaian === 'sesuai' ? (
                                    <>
                                        Sesuai / <del>Tidak Sesuai</del>
                                    </>
                                ) : data.kesesuaian === 'tidak sesuai' ? (
                                    <>
                                        <del>Sesuai</del> / Tidak Sesuai
                                    </>
                                ) : (
                                    <>Sesuai / Tidak Sesuai</>
                                )}
                                )*
                            </td>
                        </tr>
                        <tr>
                            <td className="pr-2">5. </td>
                            <td className="pr-2">Dokumentasi Terlampir.</td>
                        </tr>
                    </tbody>
                </table>

                <p className='mt-2'>
                    Catatan:<br />
                    {data.catatan}
                </p>

                <p>Demikian Berita acara ini dibuat untuk dapat dipergunakan seperlunya.</p>

                <h4 className="mt-2 font-semibold text-center">Tim Teknis</h4>

                <table className="mt-2 mb-2 w-full table-auto border-2 border-black text-sm">
                    <thead>
                        <tr>
                            <th className="border-2 border-black px-2 py-1 font-semibold">No</th>
                            <th className="border-2 border-black px-2 py-1 font-semibold">Nama</th>
                            <th className="border-2 border-black px-2 py-1 font-semibold">Jabatan/Instansi</th>
                            <th className="border-2 border-black px-2 py-1 font-semibold">Tanda Tangan</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border-2 border-black px-2 py-1">1.</td>
                            <td className="border-2 border-black px-2 py-1">{data.tim && data.tim.petugas_satu ? data.tim.petugas_satu.name : '-'}</td>
                            <td className="border-2 border-black px-2 py-1">DPMPTSP Kota Pekalongan</td>
                            <td className="border-2 border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border-2 border-black px-2 py-1">2.</td>
                            <td className="border-2 border-black px-2 py-1">{data.tim && data.tim.petugas_dua ? data.tim.petugas_dua.name : '-'}</td>
                            <td className="border-2 border-black px-2 py-1">DPMPTSP Kota Pekalongan</td>
                            <td className="border-2 border-black px-2 py-1"></td>
                        </tr>
                    </tbody>
                </table>

                <p className="mt-2">Keterangan: * coret yang tidak sesuai</p>
                <div className="page-break"></div>
                {data.foto ? (
                    <div className="relative w-full my-4 py-5">
                        <img src={`/storage/${data.foto}`} alt="Foto Monitoring" className="w-full" />
                        <div className="absolute bottom-[20px] w-full">
                            <div className="flex w-full flex-row items-start gap-2.5">
                                {data.latitude && data.longitude ? (
                                    <MapContainer
                                        center={[data.latitude, data.longitude]}
                                        zoom={13}
                                        scrollWheelZoom={true}
                                        attributionControl={false}
                                        zoomControl={false}
                                        className="ml-[10px] mb-[10px] h-[100px] w-[200px] rounded-md shadow"
                                    >
                                        <TileLayer
                                            attribution="&copy; OpenStreetMap contributors"
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker key={data.id} position={[data.latitude, data.longitude]} icon={markerIconHijau} />
                                        <ResizeMap />
                                    </MapContainer>
                                ) : (
                                    <p>Loading map...</p>
                                )}
                                {/* <div id="map" className="mb-[10px] ml-[10px] h-[150px] w-[200px] rounded-[10px]"></div> */}
                                <div className="mr-[10px] mb-[10px] h-[100px] w-full rounded-[10px] bg-black/50 p-2.5 text-white">
                                    <h3 className="font-semibold">Lokasi Monitoring</h3>
                                    <p className="text-sm">{alamat.display_name} <br />Lat {data.latitude}, Long {data.longitude}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Tidak ada foto</p>
                )}
            </div>
        </>
    );
}
