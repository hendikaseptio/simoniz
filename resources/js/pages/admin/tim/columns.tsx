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
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';

export type Agama = {
    id: string;
    nama: string;
    created_at: string;
};

export const columns: ColumnDef<Agama>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Id" />,
    },
    {
        accessorKey: 'petugas1',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Petugas 1" />,
        cell: ({ row }) => {
            const petugas = row.original.petugas_satu;
            return petugas?.name || '-';
        },
    },
    {
        accessorKey: 'petugas2',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Petugas 2" />,
        cell: ({ row }) => {
            const petugas = row.original.petugas_dua;
            return petugas?.name || '-';
        },
    },
    {
        accessorKey: 'bulan',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Bulan" />,
    },
    {
        accessorKey: 'tahun',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tahun" />,
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
            const tim = row.original;
            const [open, setOpen] = useState(false);
            const handleDelete = () => {
                router.delete(`/admin/tim/${tim.id}`, {
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
                            <DropdownMenuItem onClick={() => router.visit(`/admin/tim/${tim.id}/edit`)}>
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
                                    Data tim akan dihapus secara permanen.
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
