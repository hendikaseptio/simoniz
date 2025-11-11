import { DataTableServer } from '@/components/custom/table/datatable-server';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { columns } from '@/pages/admin/dokumen/columns';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { CheckCircle2, FileBox, Files, FileSearch, Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Dokumen',
        href: '/admin/dokumen',
    },
];

export default function Index() {
    const { dokumen, flash, typeCounts, statusCounts } = usePage().props;
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
                <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-3">
                    <Card>
                        <CardContent className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">Total Dokumen</div>
                                <div className="rounded-full bg-secondary p-2">
                                    <Files className="size-4 text-primary" />
                                </div>
                            </div>
                            <div className="text-lg font-semibold">{dokumen.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">Total Tipe Dokumen</div>
                                <div className="rounded-full bg-secondary p-2">
                                    <FileBox className="size-4 text-primary" />
                                </div>
                            </div>
                            <div className="text-lg font-semibold">
                                {Object.entries(typeCounts).map(([key, value]) => (
                                    <Link
                                        key={key}
                                        className="m-1 inline-block"
                                        href={route('admin.dokumen.index', { type: key })}
                                        preserveScroll
                                    >
                                        <Badge>
                                            {key.replaceAll('_', ' ')}: {value}
                                        </Badge>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">Total Status Dokumen</div>
                                <div className="rounded-full bg-secondary p-2">
                                    <FileSearch className="size-4 text-primary" />
                                </div>
                            </div>
                            <div className="text-lg font-semibold">
                                {Object.entries(statusCounts).map(([key, value]) => (
                                    <Link
                                        key={key}
                                        className="m-1 inline-block"
                                        href={route('admin.dokumen.index', { status: key })}
                                        preserveScroll
                                    >
                                        <Badge>
                                            {key.replaceAll('_', ' ')}: {value}
                                        </Badge>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <DataTableServer columns={columns} initialData={dokumen} />
            </div>
        </AppLayout>
    );
}
