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
import { Archive, Copy, FileCheck2, FileX2, FolderOpen, MoreHorizontal, Pencil, PencilLine, Signature, Trash } from 'lucide-react';
import { useState } from 'react';

export type DOkumen = {
    id: string;
    id_pendaftaran: string;
    tim_id: string,
    created_at: string;
};

export const columns: ColumnDef<DOkumen>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Id" />,
    },
    {
        accessorKey: 'nama',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Dokumen" />,
    },
    {
        accessorKey: 'type',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Type Dokumen" />,
        cell: ({ row }) => {
            const formatted = row.getValue('type').replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
            return <b>{formatted}</b>;
        }
    },
    {
        accessorKey: 'status',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ row }) => {
            const val = row.getValue('status');
            if (val === 'draft') {
                return <Badge variant="default"><PencilLine />Draft</Badge>;
            }
            if (val === 'archived') {
                return <Badge variant="default"><Archive />Archived</Badge>;
            }
            if (val === 'approved') {
                return <Badge variant="secondary" className='bg-emerald-500 dark:bg-emerald-700'><FileCheck2 />Approved</Badge>;
            }
            if (val === 'rejected') {
                return <Badge variant="destructive"><FileX2 />Rejected</Badge>;
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
            const dokumen = row.original;
            const [open, setOpen] = useState(false);
            const handleDelete = () => {
                router.delete(`/admin/dokumen/${dokumen.id}`, {
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
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(dokumen.id)}>
                                <Copy />
                                Copy Tim ID
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.visit(`/admin/dokumen/${dokumen.id}/show`)}>
                                <FolderOpen />
                                Detail
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
                                    Data dokumen <strong>{dokumen.nama}</strong> akan dihapus secara permanen.
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
