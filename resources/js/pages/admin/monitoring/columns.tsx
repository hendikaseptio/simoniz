'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components/ui/column-header';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TanggalIndo } from '@/utils/dateFormat';
import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Copy, MoreHorizontal, Pencil } from 'lucide-react';

export type Monitoring = {
    id: string;
    nama: string;
    created_at: string;
    reklame: {
        id_pendaftaran: string;
    }
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
            return reklame.id_pendaftaran
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
        cell: ({ row }) => {
            const val = row.getValue('cek_lapangan');
            if (val === 'belum') {
                return <Badge variant="destructive">Belum</Badge>;
            }
            if (val === 'sudah') {
                return <Badge variant="default" className="bg-emerald-500 dark:bg-emerald-800">Sudah</Badge>;
            }
        },
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
        header: () => "Kelola",
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
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(monitoring.reklame?.id_pendaftaran)}>
                                <Copy />
                                Copy ID Pendaftaran
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.visit(`/admin/monitoring/${monitoring.id}/edit`)}>
                                <Pencil />
                                Edit
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>  
                </>
            );
        },
    },
];
