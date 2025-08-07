import InputText from '@/components/custom/form/input-text';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useFormHandler from '@/hooks/useFormHandler';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import { Head, Link, usePage } from '@inertiajs/react';
import { AlertCircleIcon, ArrowLeft, Send } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Data Agama',
        href: '/admin/agama/edit',
    },
];

export default function EditAgama() {
    const { agama, old } = usePage().props;
    const { values, errors, handleChange, handleSubmit } = useFormHandler(
        {
            nama: agama?.nama || old?.nama || '',
        },
        `/admin/agama/${agama?.id}`,
        'put',
    );
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Agama" />
            <div className="p-5 space-y-5">
                {errors && Object.keys(errors).length > 0 && (
                    <Alert variant={'destructive'}>
                        <AlertCircleIcon />
                        <AlertTitle>Terjadi Kesalahan Saat Mengirim</AlertTitle>
                        <AlertDescription className="space-y-1">
                            <p>Tolong cek inputan Anda dan mencobanya lagi.</p>
                            <ul className="list-inside list-disc text-sm">
                                {Object.entries(errors).map(([field, message]) => (
                                    <li key={field}>{message}</li>
                                ))}
                            </ul>
                        </AlertDescription>
                    </Alert>
                )}
                <Card>
                    <CardHeader><CardTitle>Form Edit Agama</CardTitle></CardHeader>
                    <CardContent>
                        <form action="#">
                            <InputText
                                name="nama"
                                label="Nama Agama"
                                type="text"
                                placeholder="Masukkan Nama Agama"
                                onChange={handleChange}
                                value={values.nama}
                                errors={errors}
                            ></InputText>
                            <div className="flex justify-end mt-3 space-x-3">
                                <Link href="/admin/agama">
                                    <Button variant={'ghost'}>
                                        <ArrowLeft />
                                        Batal
                                    </Button>
                                </Link>
                                <Button onClick={handleSubmit}>
                                    <Send />
                                    Simpan
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
