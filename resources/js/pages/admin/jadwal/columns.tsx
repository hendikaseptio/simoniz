'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components/ui/column-header';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TanggalIndo } from '@/utils/dateFormat';
import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Copy, MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';

export type Jadwal = {
    id: string;
    id_pendaftaran: string;
    tim_id: string,
    created_at: string;
};

export const columns: ColumnDef<Jadwal>[] = [
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
            const jadwal = row.original;
            const [open, setOpen] = useState(false);
            const handleDelete = () => {
                router.delete(`/admin/jadwal/${jadwal.id}`, {
                    preserveScroll: true,
                    replace: true,
                    preserveState: false,
                });
            };
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
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(jadwal.reklame.id_pendaftaran)}>
                                <Copy />
                                Copy ID Pendaftaran
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.visit(`/admin/jadwal/${jadwal.id}/edit`)}>
                                <Pencil />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setOpen(true)}>
                                <Trash className="text-red-500" />
                                <span className="text-red-500 hover:text-red-500">Hapus</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <AlertDialog open={open} onOpenChange={setOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Yakin ingin menghapus?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Data jadwal akan dihapus secara permanen.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDelete}>
                                    Ya, Hapus
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            );
        },
    },
];
