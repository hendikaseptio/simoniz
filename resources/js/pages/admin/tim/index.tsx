import { DataTableServer } from '@/components/custom/table/datatable-server';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { columns } from '@/pages/admin/tim/columns';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { CheckCircle2, CodeXml, HeartHandshake, Plus, UserCheck, Users, UserX } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Tim',
        href: '/admin/tim',
    },
];

export default function Index() {
    const { tim, jumlahTimAktif, jumlahTimNonAktif, flash } = usePage().props;
    console.log(tim);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Tim" />
            <div className="snap-x p-5 space-y-5">
                {flash.success && (
                    <Alert className="border-teal-500 bg-teal-100 dark:bg-teal-950">
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertTitle className="text-teal-600 dark:text-teal-400">Berhasil!</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                )}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mb-5'>
                    <Card>
                        <CardContent className='space-y-2'>
                            <div className="flex justify-between items-center">
                                <div className="text-muted-foreground text-sm">Total Tim</div>
                                <div className="bg-secondary rounded-full p-2">
                                    <Users className='text-primary size-4'/>
                                </div>
                            </div>
                            <div className="text-lg font-semibold">{ tim.total }</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className='space-y-2'>
                            <div className="flex justify-between items-center">
                                <div className="text-muted-foreground text-sm">Tim Aktif</div>
                                <div className="bg-secondary rounded-full p-2">
                                    <UserCheck className='text-primary size-4'/>
                                </div>
                            </div>
                            <div className="text-lg font-semibold">{ jumlahTimAktif }</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className='space-y-2'>
                            <div className="flex justify-between items-center">
                                <div className="text-muted-foreground text-sm">Tim Non Aktif</div>
                                <div className="bg-secondary rounded-full p-2">
                                    <UserX className='text-primary size-4'/>
                                </div>
                            </div>
                            <div className="text-lg font-semibold">{ jumlahTimNonAktif }</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className='space-y-2'>
                            <div className="flex justify-between items-center">
                                <div className="text-muted-foreground text-sm">coming soon</div>
                                <div className="bg-secondary rounded-full p-2">
                                    <CodeXml className='text-primary size-4'></CodeXml>
                                </div>
                            </div>
                            <div className="text-lg font-semibold">--</div>
                        </CardContent>
                    </Card>
                </div>
                <div className='flex justify-end'>
                    <Link href="/admin/tim/create">
                        <Button>
                            <Plus />
                            Tambah Data{' '}
                        </Button>
                    </Link>
                </div>
                <DataTableServer columns={columns} initialData={tim} />
            </div>
        </AppLayout>
    );
}
