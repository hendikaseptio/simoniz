import { DataTableServer } from '@/components/custom/table/datatable-server';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { columns } from '@/pages/kabid/approval/columns';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { CheckCircle2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Dokumen',
        href: '/kabid/approval',
    },
];

export default function Index() {
    const { approval, flash } = usePage().props;      
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
                <DataTableServer columns={columns} initialData={approval} />
            </div>
        </AppLayout>
    );
}
