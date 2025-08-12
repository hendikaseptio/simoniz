import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TanggalIndo } from '@/utils/dateFormat';
import { Head, Link, usePage } from '@inertiajs/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowLeft } from 'lucide-react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Reklame',
        href: '/admin/reklame',
    },
    {
        title: 'Detail Data Reklame',
        href: '/admin/reklame/show',
    },
];

export default function ShowReklame() {
    const { reklame } = usePage().props;
    const DetailRow = ({ label, value, isStriped }) => (
        <div className={`grid grid-cols-1 gap-y-1 px-4 py-3 md:grid-cols-2 ${isStriped ? 'bg-gray-50' : 'bg-white'}`}>
            <div className="text-sm font-semibold text-gray-500">{label}</div>
            <div className="text-base font-medium">{value || '-'}</div>
        </div>
    );
    const DetailRowList = ({ data }) => (
        <div className="overflow-hidden rounded-md border border-gray-200">
            {data.map((item, index) => (
                <DetailRow
                    key={index}
                    label={item.label}
                    value={item.value}
                    isStriped={index % 2 === 1} // Baris ganjil dikasih striping
                />
            ))}
        </div>
    );
    // data
    const perizinan = [
        { label: 'ID Pendaftaran', value: reklame.id_pendaftaran },
        { label: 'ID Pendaftaran Sebelumnya', value: reklame.prev_id_pendaftaran },
        { label: 'Tanggal Penetapan', value: TanggalIndo(reklame.tgl_penetapan) },
        { label: 'Tanggal Selesai Penetapan', value: TanggalIndo(reklame.tgl_selesai_penetapan) },
        { label: 'Monitoring', value: reklame.monitoring },
        { label: 'Perpanjangan', value: reklame.perpanjangan },
    ];
    const pemohon = [
        { label: 'Nama Pemohon', value: reklame.nama_pemohon },
        { label: 'Alamat Pemohon', value: reklame.alamat_pemohon },
        { label: 'No HP Pemohon', value: reklame.no_hp_pemohon },
        { label: 'Nama Perusahaan', value: reklame.nama_perusahaan },
        { label: 'Alamat Perusahaan', value: reklame.alamat_perusahaan },
    ];
    const reklameData = [
        { label: 'Jalan', value: reklame.jalan },
        { label: 'Isi Konten', value: reklame.isi_konten },
        { label: 'Jenis Reklame', value: reklame.jenis_reklame },
        { label: 'Jumlah Sisi', value: reklame.jumlah_sisi },
        { label: 'Keterangan Lokasi', value: reklame.keterangan_lokasi },
    ];
    // map
    const markerIcon = new L.Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Reklame" />
            <div className="space-y-5 p-5">
                <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="font-bold">Informasi Perizinan</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <DetailRowList data={perizinan} />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="font-bold">Informasi Pemohon dan Perusahaan</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <DetailRowList data={pemohon} />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="font-bold">Detail Reklame</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    {/* <Link href={reklame.foto_reklame}>{reklame.foto_reklame}</Link> */}
                                    {reklame.foto_reklame && (
                                        <img className="h-full w-full rounded-md object-cover shadow" src={reklame.foto_reklame} alt="Foto Reklame" />
                                    )}
                                </div>
                                <div className="space-y-4">
                                    <DetailRowList data={reklameData} />
                                    <div>
                                        <Label className="mb-2 block">Lokasi di Peta</Label>
                                        <MapContainer
                                            center={[reklame.latitude, reklame.longitude]}
                                            zoom={13}
                                            scrollWheelZoom={true}
                                            className="h-72 w-full rounded-md shadow"
                                        >
                                            <TileLayer
                                                attribution="&copy; OpenStreetMap contributors"
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            <Marker position={[reklame.latitude, reklame.longitude]} icon={markerIcon} />
                                        </MapContainer>
                                    </div>
                                </div>
                                
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <div className="mt-5 flex justify-end">
                    <Link href="/admin/reklame">
                        <Button variant="secondary">
                            <ArrowLeft className="mr-2" />
                            Kembali
                        </Button>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
