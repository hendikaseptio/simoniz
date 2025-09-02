import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Presentation, User, Users } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { reklame, monitoring, tim, petugas} = usePage().props;
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
                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <Calendar
                            mode="single"
                            selected={"19-05-2025"}
                            onSelect={'19-05-2025'}
                            className="w-full rounded-md border shadow-sm"
                            captionLayout="dropdown"
                        />
                    </div>
                    <div className='col-span-2'>
                        <MapContainer
                            center={[-6.889836, 109.674591]}
                            zoom={13}
                            scrollWheelZoom={true}
                            className="h-[500px] w-full rounded-md shadow"
                        >
                            <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            {reklame.map((item) => {
                                const status = item.monitoring[0]?.cek_lapangan;
                                let icon;
                                if (status === 'sudah') {
                                    icon = markerIconHijau;
                                } else if (status === 'belum') {
                                    icon = markerIconMerah;
                                } else {
                                    icon = markerIconBiru;
                                }
                                return (
                                    <Marker key={item.id} position={[item.latitude, item.longitude]} icon={icon}>
                                        <Popup>
                                            <div className="space-y-1 text-sm">
                                                <div>
                                                    <strong>ID:</strong> {item.id_pendaftaran}
                                                </div>
                                                <div>
                                                    <strong>Perusahaan :</strong> {item.nama_perusahaan}
                                                </div>
                                                <div>
                                                    <strong>Tema Reklame:</strong> {item.isi_konten || '-'}
                                                </div>
                                                <div>
                                                    <strong>Jalan:</strong> {item.jalan || '-'}
                                                </div>
                                                <div>
                                                    <strong>Status Monitoring:</strong> {item.monitoring[0]?.cek_lapangan || '-'}
                                                </div>
                                                <div>
                                                    <img src={item.foto_reklame} alt="foto" />
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
