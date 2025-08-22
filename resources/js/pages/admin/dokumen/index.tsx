import InputSelect from '@/components/custom/form/input-select';
import InputText from '@/components/custom/form/input-text';
import { DataTableServer } from '@/components/custom/table/datatable-server';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFilterForm } from '@/hooks/userFormFilter';
import AppLayout from '@/layouts/app-layout';
import { columns } from '@/pages/admin/dokumen/columns';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Calendar1, CalendarDays, CheckCircle2, ListFilter, Plus, PlusCircle, Printer, RotateCcw } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Dokumen',
        href: '/admin/dokumen',
    },
];

export default function Index() {
    const { dokumen, flash } = usePage().props;      
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Dokumen" />
            <div className="snap-x space-y-5 p-5">
                {flash.success && (
                    <Alert className="border-teal-500 bg-teal-100 dark:bg-teal-950">
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertTitle className="text-teal-600 dark:text-teal-400">Berhasil!</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                )}
                <div className="mb-5 grid grid-cols-2 gap-5 md:grid-cols-4">
                    <Card>
                        <CardContent className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">Total Dokumen</div>
                                <div className="rounded-full bg-secondary p-2">
                                    <CalendarDays className="size-4 text-primary" />
                                </div>
                            </div>
                            <div className="text-lg font-semibold">{dokumen.total}</div>
                        </CardContent>
                    </Card>
                    <Card className="col-span-2">
                        <CardContent className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">Total Dokumen Aktif</div>
                                <div className="rounded-full bg-secondary p-2">
                                    <Calendar1 className="size-4 text-primary" />
                                </div>
                            </div>
                            <div className="text-lg font-semibold">{0}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">Total Dokumen Selesai</div>
                                <div className="rounded-full bg-secondary p-2">
                                    <CalendarDays className="size-4 text-primary" />
                                </div>
                            </div>
                            <div className="text-lg font-semibold">{0}</div>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex justify-end">
                    <Button>
                        <Plus />
                        Tambah Arsip Baru
                    </Button>
                </div>
                <DataTableServer columns={columns} initialData={dokumen} />
            </div>
        </AppLayout>
    );
}
