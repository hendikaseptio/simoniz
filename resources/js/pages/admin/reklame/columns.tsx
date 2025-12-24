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
import { Badge } from '@/components/ui/badge';
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
import { Copy, FolderOpen, MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';

export type Agama = {
    id: string;
    nama: string;
    created_at: string;
};

export const columns: ColumnDef<Agama>[] = [
    {
  id: 'no',
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="No" />
  ),
  cell: ({ row }) => row.index + 1,
},
    {
        accessorKey: 'id_pendaftaran',
        header: ({ column }) => <DataTableColumnHeader column={column} title="ID Pendaftaran" />,
    },
    {
        accessorKey: 'nama_pemohon',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Pemohon" />,
    },
    {
        accessorKey: 'nama_perusahaan',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Perusahaan" />,
    },
    {
        accessorKey: 'monitoring',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Monitoring" />,
        cell: ({ row }) => {
            const val = row.getValue('monitoring');
            if (val === 'tidak') {
                return <Badge variant="destructive">Tidak</Badge>;
            }
            if (val === 'iya') {
                return <Badge variant="default">Iya</Badge>;
            }
            if (val === 'kosong') {
                return <Badge variant="secondary">Kosong</Badge>;
            }
        },
    },
    {
        accessorKey: 'tgl_penetapan',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tgl. Penetapan" />,
        cell: ({ row }) => TanggalIndo(row.getValue('tgl_penetapan')),
    },
    {
        accessorKey: 'tgl_selesai_penetapan',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tgl. Selesai" />,
        cell: ({ row }) => TanggalIndo(row.getValue('tgl_selesai_penetapan')),
    },
    {
        accessorKey: 'jalan',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Jalan" />,
    },
    {
        accessorKey: 'jenis_reklame',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Jenis Reklame" />,
    },
    {
        accessorKey: 'isi_konten',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tema/Isi Konten" />,
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tanggal Buat" />,
        cell: ({ row }) => TanggalIndo(row.getValue('created_at')),
    },
    {
        id: 'actions',
        enableSorting: false,
        enableColumnFilter: false,
        enableHiding: false,
        header: () => 'Kelola',
        cell: ({ row }) => {
            const reklame = row.original;
            const [open, setOpen] = useState(false);
            const handleDelete = () => {
                router.delete(`/admin/reklame/${reklame.id}`, {
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
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(reklame.id_pendaftaran)}>
                                <Copy />
                                Copy ID Pendaftaran
                            </DropdownMenuItem>
                             <DropdownMenuItem onClick={() => router.visit(`/admin/reklame/${reklame.id}`)}>
                                <FolderOpen />
                                Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.visit(`/admin/reklame/${reklame.id}/edit`)}>
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
                                    Data reklame akan dihapus secara permanen.
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
