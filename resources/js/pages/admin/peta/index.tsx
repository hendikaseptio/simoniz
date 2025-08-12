import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Peta Data Reklame',
        href: '/admin/peta',
    },
];

export default function Index() {
    const { reklame } = usePage().props;
    const markerIcon = new L.Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Reklame" />
            <div className="snap-x space-y-5 p-5">
                <MapContainer
                    center={[-6.889836, 109.674591]}
                    zoom={13}
                    scrollWheelZoom={true}
                    className="h-[500px] w-full rounded-md shadow"
                >
                    <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {reklame.map((item) => (
                        <Marker key={item.id} position={[item.latitude, item.longitude]} icon={markerIcon} >
                            <Popup>
                                <div className="space-y-1 text-sm">
                                    <div><strong>ID:</strong> {item.id_pendaftaran}</div>
                                    <div><strong>Perusahaan :</strong> {item.nama_perusahaan}</div>
                                    <div><strong>Tema Reklame:</strong> {item.isi_konten || '-'}</div>
                                    <div><strong>Jalan:</strong> {item.jalan || '-'}</div>
                                    <div><strong>Status:</strong> {item.monitoring || '-'}</div>
                                    <div>
                                        <img src={item.foto_reklame} alt="foto" />
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                    
                </MapContainer>
            </div>
        </AppLayout>
    );
}
