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
        href: '/admin/dokumen',
    },
    {
        title: 'Detail Dokumen',
        href: '/admin/dokumen/show',
    },
];

export default function RequestApproval() {
    const { dokumen, approval, flash } = usePage().props;
    console.log(approval);
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
                                {approval ? (
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                                            <div className="font-medium">Tanggal Permintaan</div>
                                            <div>
                                                <span className="mr-3">:</span> {TanggalIndo(approval.created_at)}
                                            </div>
                                            <div className="font-medium">Tanggal Approval</div>
                                            <div>
                                                <span className="mr-3">:</span> <b>{TanggalIndo(approval.tanggal_approval)}</b>
                                            </div>
                                            <div className="font-medium">Status</div>
                                            <div>
                                                {' '}
                                                <span className="mr-3">:</span>{' '}
                                                {approval.status == 'setuju' ? (
                                                    <Badge>
                                                        <CheckCheck /> Disetujui
                                                    </Badge>
                                                ) : approval.status == 'tidak setuju' ? (
                                                    <Badge variant={'destructive'}>
                                                        <X /> Tidak Disetujui
                                                    </Badge>
                                                ) : (
                                                    <Badge variant={'secondary'}>
                                                        <Loader /> Dalam Proses
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="font-medium">Catatan</div>
                                            <div>
                                                <span className="mr-3">:</span> <b>{approval.catatan}</b>
                                            </div>
                                        </div>
                                        {approval.status == 'tidak setuju' && (
                                            <div className='mt-3'>
                                                <Link href={`/admin/dokumen/${dokumen.id}/sendApproval`}>
                                                    <Button className="w-full">
                                                        <Send /> Kirim Permintaan Approval
                                                    </Button>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <Alert>
                                            <TriangleAlert />
                                            <AlertTitle>Dokumen Belum Diajukan Approval</AlertTitle>
                                            <AlertDescription>Klik tombol dibawah ini untuk mengajukan approval</AlertDescription>
                                        </Alert>
                                        <Link href={`/admin/dokumen/${dokumen.id}/sendApproval`}>
                                            <Button className="w-full">
                                                <Send /> Kirim Permintaan Approval
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
