import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Presentation, User, Users } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useState } from 'react';
import { TanggalIndo } from '@/utils/dateFormat';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { reklame, monitoring, tim, petugas, jadwal} = usePage().props;
    const markerIconHijau = new L.Icon({
        iconUrl: '/marker/marker1.png',
        iconSize: [24, 35],
        iconAnchor: [12, 10],
    });

    const markerIconMerah = new L.Icon({
        iconUrl: '/marker/marker3.png',
        iconSize: [24, 35],
        iconAnchor: [12, 10],
    });

    const markerIconBiru = new L.Icon({
        iconUrl: '/marker/marker2.png',
        iconSize: [24, 35],
        iconAnchor: [12, 10],
    });
    const selectedDates = jadwal.map((item) => item.tanggal);

    const [selectedDateInfo, setSelectedDateInfo] = useState(null);
    function handleDateSelect(date) {
        if (!date || isNaN(new Date(date).getTime())) {
            setSelectedDateInfo({
                tanggal: null,
                items: [],
            });
            return;
        }
        const selected = new Date(date).toISOString().split('T')[0];
        const matched = jadwal.filter((item) => item.tanggal === selected);
        setSelectedDateInfo({
            tanggal: selected,
            items: matched,
        });
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">Total Reklame</div>
                                <div className="rounded-full bg-secondary p-2">
                                    <Presentation className="size-4 text-primary" />
                                </div>
                            </div>
                            <div className="text-lg font-semibold">{reklame.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">Total Petugas</div>
                                <div className="rounded-full bg-secondary p-2">
                                    <User className="size-4 text-primary" />
                                </div>
                            </div>
                            <div className="text-lg font-semibold">{petugas}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">Total Tim</div>
                                <div className="rounded-full bg-secondary p-2">
                                    <Users className="size-4 text-primary" />
                                </div>
                            </div>
                            <div className="text-lg font-semibold">{tim}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">Total MOnitoring</div>
                                <div className="rounded-full bg-secondary p-2">
                                    <Presentation className="size-4 text-primary" />
                                </div>
                            </div>
                            <div className="text-lg font-semibold">{monitoring}</div>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                        <Calendar
                            mode="multiple"
                            selected={selectedDates}
                            onSelect={(date) => handleDateSelect(date)}
                            className="w-full rounded-md border shadow-sm"
                            captionLayout="dropdown"
                        />
                        {selectedDateInfo && (
                            <div className="mt-4 rounded-md border bg-white p-4 shadow-md">
                                {selectedDateInfo.items.length > 0 ? (
                                    selectedDateInfo.items.map((item) => (
                                        <div key={item.id}>
                                            <h3 className="mb-2 text-sm font-semibold text-gray-700">
                                                Jadwal pada {TanggalIndo(selectedDateInfo.tanggal)}
                                            </h3>
                                            <div className="mb-2 text-sm text-gray-800">
                                                <div><span className="font-medium">Reklame:</span> {item.reklame.isi_konten}</div>
                                                <div><span className="font-medium">Jalan:</span> {item.reklame.jalan}</div>
                                                <div><span className="font-medium">Tim:</span> {item.tim.petugas_satu.name} & {item.tim.petugas_dua.name}</div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">Tidak ada jadwal.</p>
                                )}
                            </div>
                        )}
                    </div>
                    <div className='col-span-2'>
                        <MapContainer center={[-6.889836, 109.674591]} zoom={13} scrollWheelZoom={true} className="h-[500px] w-full rounded-md shadow">
                            <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            {reklame.map((item) => {
                                const status = item.cek_lapangan;
                                let icon;
                                if (status === 'sudah') {
                                    icon = markerIconHijau;
                                } else if (status === 'belum') {
                                    icon = markerIconMerah;
                                } else {
                                    icon = markerIconBiru;
                                }
                                return (
                                    <Marker key={item.id} position={[item.reklame.latitude, item.reklame.longitude]} icon={icon}>
                                        <Popup>
                                            <div className="space-y-1 text-sm">
                                                <div>
                                                    <strong>ID:</strong> {item.reklame.id_pendaftaran}
                                                </div>
                                                <div>
                                                    <strong>Perusahaan :</strong> {item.reklame.nama_perusahaan}
                                                </div>
                                                <div>
                                                    <strong>Tema Reklame:</strong> {item.reklame.isi_konten || '-'}
                                                </div>
                                                <div>
                                                    <strong>Jalan:</strong> {item.reklame.jalan || '-'}
                                                </div>
                                                <div>
                                                    <strong>Status Monitoring:</strong> {item.cek_lapangan || '-'}
                                                </div>
                                                <div>
                                                    <img src={item.reklame.foto_reklame} alt="foto" />
                                                </div>
                                            </div>
                                        </Popup>
                                    </Marker>
                                )
                            })}
                        </MapContainer>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
