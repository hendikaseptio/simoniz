
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { BadgeCheck } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Jadwal',
        href: '/admin/jadwal',
    },
    {
        title: 'Tambah Data Jadwal',
        href: '/admin/jadwal/create',
    },
];

export default function RequestApproval() {
    const { dokumen } = usePage().props
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Tim" />
            <div className="p-5 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <iframe
                        className='md:col-span-2 w-full h-screen border rounded-lg shadow'
                        src={dokumen}
                    />
                    <div>
                        <Card>
                            <CardContent>
                                <h2 className="text-lg font-semibold mb-2">Status Approval</h2>
                                <div className="grid grid-cols-2 gap-y-2 text-sm">
                                    <div className="font-medium">Tanggal Permintaan</div>
                                    <div> <span className='mr-3'>:</span> 20 Agustus 2025</div>

                                    <div className="font-medium">Status</div>
                                    <div> <span className='mr-3'>:</span> <Badge><BadgeCheck></BadgeCheck> Disetujui</Badge></div>
                                </div>

                                <Button className='w-full mt-5'>Kirim Permintaan Approval</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
