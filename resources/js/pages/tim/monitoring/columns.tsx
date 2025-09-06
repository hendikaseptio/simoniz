'use client';

import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components/ui/column-header';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TanggalIndo } from '@/utils/dateFormat';
import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { FileInput, MoreHorizontal, Printer} from 'lucide-react';

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
        cell: ({ row }) => TanggalIndo(row.getValue('tanggal')),
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
            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => router.visit(`/tim/monitoring/${monitoring.id}/edit`)}>
                                <FileInput />
                                Proses
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => window.open(`/tim/monitoring/${monitoring.id}/print`, '_blank')}>
                                <Printer />
                                Print
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            );
        },
    },
];
