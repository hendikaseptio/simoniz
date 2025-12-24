'use client';

import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, SortingState, useReactTable } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { NumberFormat } from '@/utils/numberFormat';
import { Link, router } from '@inertiajs/react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronUp, RotateCcw, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    initialData: {
        data: TData[];
        current_page: number;
        per_page: number;
        from: number;
    };
}

export function DataTableServer<TData, TValue>({ columns, initialData }: DataTableProps<TData, TValue>) {
    const actionsColumn = columns.find((col) => col.id === 'actions');
    const [globalFilter, setGlobalFilter] = useState('');
    const [data] = useState(initialData.data);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>(() => {
        const params = new URLSearchParams(window.location.search);
        const sort = params.get('sort');
        const direction = params.get('direction') ?? 'asc';

        return sort ? [{ id: sort, desc: direction === 'desc' }] : [];
    });
    const table = useReactTable({
        columns,
        data,
        meta: {
            currentPage: initialData.current_page,
            perPage: initialData.per_page,
            from: initialData.from,
        },
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        manualSorting: true,
        state: {
            columnFilters,
            globalFilter,
            sorting,
        },
        onSortingChange: (updater) => {
            const next = typeof updater === 'function' ? updater(sorting) : updater;
            setSorting(next);

            const sortColumn = next[0]?.id;
            const sortDirection = next[0]?.desc ? 'desc' : 'asc';

            if (sortColumn) {
                handleSort(sortColumn, sortDirection);
            }
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
    });

    const getCurrentParams = () => {
        const params = new URLSearchParams(window.location.search);
        return {
            sort: params.get('sort'),
            direction: params.get('direction'),
            search: params.get('search'),
            page: params.get('page'),
        };
    };
    const { sort, direction } = getCurrentParams();
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const sort = params.get('sort');
        const direction = params.get('direction') ?? 'asc';

        if (sort) {
            setSorting([{ id: sort, desc: direction === 'desc' }]);
        }
    }, []);

    const handleSort = (columnId: string, direction: 'asc' | 'desc') => {
        const params = new URLSearchParams(window.location.search);

        params.set('sort', columnId);
        params.set('direction', direction);
        params.set('page', '1');

        router.get(window.location.pathname, Object.fromEntries(params.entries()), {
            preserveScroll: true,
            preserveState: false,
            replace: true,
        });
    };

    // handle search
    const [searchInput, setSearchInput] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('search') || '';
    });

    // Handle perubahan input pencarian
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };

    // Fungsi untuk menangani klik tombol pencarian
    const handleSearchClick = () => {
        const params = new URLSearchParams(window.location.search);
        params.set('search', searchInput);
        params.set('page', '1');

        // window.location.href = `${window.location.pathname}?${params.toString()}`;
        router.get(window.location.pathname, Object.fromEntries(params.entries()), {
            preserveScroll: true,
            preserveState: false,
            replace: true,
        });
    };
    // reset
    const handleResetFilter = () => {
        router.get(
            window.location.pathname,
            {},
            {
                preserveScroll: true,
                preserveState: false,
                replace: true,
            },
        );
        setSearchInput('');
    };
    return (
        <>
            <div className="my-3 flex w-full items-center space-x-2">
                <Input placeholder="Search..." value={searchInput} onChange={handleSearch} className="w-full" />
                <Button onClick={handleSearchClick} variant={'outline'}>
                    <Search /> <span className="hidden sm:block">Cari</span>
                </Button>
                <Button onClick={handleResetFilter} variant={'outline'}>
                    <RotateCcw /> <span className="hidden sm:block">Reset Filter</span>
                </Button>
            </div>

            <div className="snap-x-auto overflow-x-auto rounded-md border">
                <div className="hidden md:block">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead
                                                key={header.id}
                                            >
                                                {
                                                    flexRender(header.column.columnDef.header, header.getContext())
                                                }
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className='even:bg-muted m-0 border-t p-0'>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* List untuk mobile */}
                <div className="md:hidden">
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <div key={row.id} className="relative space-y-2 border-b p-4">
                                <div className="absolute top-2 right-2">{actionsColumn?.cell?.({ row } as any)}</div>

                                {row.getVisibleCells().map((cell) => {
                                    if (cell.column.id === 'actions') return null;
                                    const col = cell.column;
                                    const header = col.columnDef.header;
                                    const label = typeof header === 'string' ? header : col.id;

                                    if (cell.column.id === 'foto') {
                                        return (
                                            <img
                                                key={cell.id}
                                                src={`/storage/${cell.getValue()}`}
                                                alt="foto"
                                                className="h-16 w-16 rounded-md border object-cover"
                                                onError={(e) => ((e.target as HTMLImageElement).src = '/storage/uploads/foto-produk/default.png')}
                                            />
                                        );
                                    }

                                    return (
                                        <div key={cell.id}>
                                            <div className="text-xs text-gray-500">{label}</div>
                                            <div className="font-medium">{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))
                    ) : (
                        <div className="p-4 text-center">No results.</div>
                    )}
                </div>
                {/* Tampilkan Link Paginate jika ada */}
                <div className="flex flex-wrap items-center md:justify-between justify-center p-2">
                    <div className="text-muted-foreground flex-1 text-sm text-center sm:text-left">
                        Menampilkan {NumberFormat(initialData.from)} - {NumberFormat(initialData.to)} dari {NumberFormat(initialData.total)} baris
                    </div>
                    <div className='flex flex-wrap items-center md:justify-between justify-center p-2'>
                        <div className="flex w-[150px] items-center justify-center text-sm font-medium">
                            Halaman {NumberFormat(initialData.current_page)} dari {NumberFormat(initialData.last_page)}
                        </div>
                        <div className="flex items-center space-x-2">
                            <Link href={initialData.first_page_url ?? "#"} preserveScroll>
                                <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" disabled={initialData.current_page === 1}>
                                    <span className="sr-only">Halaman pertama</span>
                                    <ChevronsLeft />
                                </Button>
                            </Link>
                            <Link href={initialData.prev_page_url ?? "#"} preserveScroll>
                                <Button variant="outline" className="h-8 w-8 p-0" disabled={initialData.current_page === 1}>
                                    <span className="sr-only">Halaman sebelumnya</span>
                                    <ChevronLeft />
                                </Button>
                            </Link>
                            <Link href={initialData.next_page_url ?? "#"} preserveScroll>
                                <Button variant="outline" className="h-8 w-8 p-0" disabled={initialData.current_page === initialData.last_page}>
                                    <span className="sr-only">Halaman berikutnya</span>
                                    <ChevronRight />
                                </Button>
                            </Link>
                            <Link href={initialData.last_page_url ?? "#"} preserveScroll>
                                <Button
                                    variant="outline"
                                    className="hidden h-8 w-8 p-0 lg:flex"
                                    disabled={initialData.current_page === initialData.last_page && initialData.last_page > 0}
                                >
                                    <span className="sr-only">Halaman terakhir</span>
                                    <ChevronsRight />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
