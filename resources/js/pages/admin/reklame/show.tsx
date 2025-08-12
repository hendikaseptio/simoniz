import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowLeft, Route } from 'lucide-react';
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
    const DetailRow = ({ label, children }) => (
        <div className="mb-4">
            <Label>{label}</Label>
            <div className="text-base font-medium">{children || '-'}</div>
        </div>
    );

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
                <Card>
                    <CardHeader>
                        <CardTitle>Detail Reklame</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardContent>
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                                defaultValue="item-1"
                            >
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Informasi Perizinan</AccordionTrigger>
                                    <AccordionContent className="flex flex-col gap-4 text-balance">
                                        <div className="space-y-3">
                                            <DetailRow label="ID Pendaftaran">{reklame.id_pendaftaran}</DetailRow>
                                            <DetailRow label="ID Pendaftaran Sebelumnya">{reklame.prev_id_pendaftaran}</DetailRow>
                                            <DetailRow label="Tanggal Penetapan">{reklame.tgl_penetapan}</DetailRow>
                                            <DetailRow label="Tanggal Selesai Penetapan">{reklame.tgl_selesai_penetapan}</DetailRow>
                                            <DetailRow label="Monitoring">{reklame.monitoring}</DetailRow>
                                            <DetailRow label="Perpanjangan">{reklame.perpanjangan}</DetailRow>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Informasi Pemohon dan Perusahaan</AccordionTrigger>
                                    <AccordionContent className="flex flex-col gap-4 text-balance">
                                        <DetailRow label="Nama Pemohon">{reklame.nama_pemohon}</DetailRow>
                                        <DetailRow label="Alamat Pemohon">{reklame.alamat_pemohon}</DetailRow>
                                        <DetailRow label="No HP Pemohon">{reklame.no_hp_pemohon}</DetailRow>
                                        <DetailRow label="Nama Perusahaan">{reklame.nama_perusahaan}</DetailRow>
                                        <DetailRow label="Alamat Perusahaan">{reklame.alamat_perusahaan}</DetailRow>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>Detail Reklame</AccordionTrigger>
                                    <AccordionContent className="flex flex-col gap-4 text-balance">
                                        <div className="grid grid-cols-2">
                                            <div>

                                            </div>
                                            <div>
                                                <DetailRow label="Jalan">{reklame.jalan}</DetailRow>
                                                <DetailRow label="Isi Konten">{reklame.isi_konten}</DetailRow>
                                                <DetailRow label="Jenis Reklame">{reklame.jenis_reklame}</DetailRow>
                                                <DetailRow label="Jumlah Sisi">{reklame.jumlah_sisi}</DetailRow>
                                                <DetailRow label="Keterangan Lokasi">{reklame.keterangan_lokasi}</DetailRow>
                                                <DetailRow label="Lokasi">{reklame.lokasi}
                                                    <Link href={reklame.lokasi}><Button><Route /> Dapatkan Rute</Button></Link>
                                                </DetailRow>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                <DetailRow label="Foto Reklame">
                                    <Link href={reklame.foto_reklame}>{reklame.foto_reklame}</Link>
                                    {reklame.foto_reklame && (
                                        <img
                                            className="max-h-[300px] w-full rounded-md object-cover shadow"
                                            src={reklame.foto_reklame}
                                            alt="Foto Reklame"
                                        />
                                    )}
                                </DetailRow>
                                <div>
                                    <DetailRow label="Koordinat">
                                        {reklame.latitude}, {reklame.longitude}
                                    </DetailRow>
                                    {/* <InputPeta reklame={reklame} readOnly /> */}
                                    <div className="space-y-4">
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
                            </div>

                            <div className="mt-5 flex justify-end">
                                <Link href="/admin/reklame">
                                    <Button variant="ghost">
                                        <ArrowLeft className="mr-2" />
                                        Kembali
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </CardContent>
                </Card>
            </div>
        </AppLayout >
    );
}
