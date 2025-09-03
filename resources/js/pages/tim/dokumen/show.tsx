import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TanggalIndo } from '@/utils/dateFormat';
import { Head, Link, usePage } from '@inertiajs/react';
import { CheckCheck, CheckCircle2, Loader, Send, TriangleAlert, X } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Dokumen',
        href: '/tim/dokumen',
    },
    {
        title: 'Detail Dokumen',
        href: '/tim/dokumen/show',
    },
];

export default function RequestApproval() {
    const { dokumen, flash } = usePage().props;
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Tim" />
            <div className="space-y-5 p-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <iframe className="h-screen w-full rounded-lg border shadow md:col-span-2" src={dokumen.path} />
                    <div>
                        {flash.success ? (
                            <Alert className="mb-3 border-teal-500 bg-teal-100 dark:bg-teal-950">
                                <CheckCircle2 className="h-4 w-4" />
                                <AlertTitle className="text-teal-600 dark:text-teal-400">Berhasil!</AlertTitle>
                                <AlertDescription>{flash.success}</AlertDescription>
                            </Alert>
                        ) : flash.error ? (
                            <Alert variant="destructive" className="mb-3">
                                <CheckCircle2 className="h-4 w-4" />
                                <AlertTitle>Error!</AlertTitle>
                                <AlertDescription>{flash.error}</AlertDescription>
                            </Alert>
                        ) : null}
                        <Card>
                            <CardContent>
                                <h2 className="mb-2 text-lg font-semibold">Status Approval</h2>
                                
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
