'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components/ui/column-header';
import { TanggalIndo } from '@/utils/dateFormat';
import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Archive, CheckCheck, ChevronRight, File, FileCheck2, FileX2, PencilLine, X } from 'lucide-react';


export type DOkumen = {
    id: string;
    id_pendaftaran: string;
    tim_id: string,
    created_at: string;
};

export const columns: ColumnDef<DOkumen>[] = [
    {
        id: 'no',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="No" />
        ),
        cell: ({ row, table }) => {
            const meta = table.options.meta as {
                currentPage: number;
                perPage: number;
            };

            return (meta.currentPage - 1) * meta.perPage + row.index + 1;
        },
        enableSorting: false,
    },
    {
        accessorKey: 'dokumen_id',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Dokumen" />,
        cell: ({ row }) => row.original.dokumen?.nama || '-',
    },

    {
        accessorKey: 'status',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ row }) => {
            const val = row.getValue('status');
            if (val === 'setuju') {
                return <Badge className='bg-green-600 dark:bg-green-700'><CheckCheck />Setuju</Badge>;
            } else if (val === 'tidak setuju') {
                return <Badge variant="destructive"><X />Tidak Setuju</Badge>;
            } else {
                return <Badge variant="default"><File />Baru</Badge>;
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
            const approval = row.original;
            return (
                <Button onClick={() => router.visit(`/kabid/approval/${approval.id}/edit`)}>
                    Proses <ChevronRight />
                </Button>
            );
        },
    },
];
