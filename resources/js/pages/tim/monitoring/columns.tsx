'use client';

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components/ui/column-header';
import { Label } from '@/components/ui/label';
import { TanggalIndo } from '@/utils/dateFormat';
import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { FileInput, Images, Route, X } from 'lucide-react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

export type Monitoring = {
    id: string;
    nama: string;
    created_at: string;
    reklame: {
        id_pendaftaran: string;
    };
};

export const columns: ColumnDef<Monitoring>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Id" />,
    },
    {
        accessorKey: 'reklame_id',
        header: ({ column }) => <DataTableColumnHeader column={column} title="ID Pendaftaran" />,
        cell: ({ row }) => {
            const reklame = row.original.reklame;
            return reklame.id_pendaftaran;
        },
    },
    {
        accessorKey: 'tanggal',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tanggal" />,
        cell: ({ row }) => TanggalIndo(row.getValue('tanggal')), // format tanggal pakai helper
    },
    {
        accessorKey: 'tim_id',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tim Jalan" />,
        cell: ({ row }) => {
            const tim = row.original.tim;
            const petugas1 = tim?.petugas_satu?.name || '-';
            const petugas2 = tim?.petugas_dua?.name || '-';
            return `${petugas1} - ${petugas2}`;
        },
    },
    {
        accessorKey: 'cek_lapangan',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Cek Lapangan" />,
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tanggal Dibuat" />,
        cell: ({ row }) => TanggalIndo(row.getValue('created_at')),
    },
    {
        id: 'actions',
        enableSorting: false,
        enableColumnFilter: false,
        enableHiding: false,
        header: () => 'Kelola',
        cell: ({ row }) => {
            const monitoring = row.original;
            const markerIcon = new L.Icon({
                iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
            });
            return (
                <div className="flex space-x-2">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="secondary"><Images />Lokasi & Foto</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Detail</AlertDialogTitle>
                                <AlertDialogDescription className="space-y-4">
                                    <Label className="mb-2 block">Lokasi di Peta</Label>
                                    <MapContainer
                                        center={[monitoring.reklame.latitude, monitoring.reklame.longitude]}
                                        zoom={13}
                                        scrollWheelZoom={true}
                                        className="h-72 w-full rounded-md shadow"
                                    >
                                        <TileLayer
                                            attribution="&copy; OpenStreetMap contributors"
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker position={[monitoring.reklame.latitude, monitoring.reklame.longitude]} icon={markerIcon} />
                                    </MapContainer>
                                    <a href={monitoring.reklame.lokasi} target="_blank" rel="noopener noreferrer">
                                        <Button className="w-full">
                                            <Route /> Buka Rute
                                        </Button>
                                    </a>
                                    <img src={monitoring.reklame.foto} alt="foto reklame" />
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>
                                    <X /> Tutup
                                </AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <Button onClick={() => router.visit(`/tim/monitoring/${monitoring.id}/edit`)}>
                        <FileInput />
                        Proses
                    </Button>
                </div>
            );
        },
    },
];
