import InputSelect from '@/components/custom/form/input-select';
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
        title: 'Edit Data Tim',
        href: '/admin/tim/edit',
    },
];

export default function EditTim() {
    const { tim, old } = usePage().props;
    console.log(tim)
    const { values, errors, handleChange, handleSubmit } = useFormHandler(
        {
            name: tim?.name || old?.name || '',
            email: tim?.email || old?.email || '',
            password: tim?.password || old?.password || '',
            password_confirmation: tim?.password_confirmation || old?.password_confirmation || '',
            status: tim?.status || old?.status || '',
        },
        `/admin/tim/${tim?.id}`,
        'put',
    );
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Tim" />
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
                    <CardHeader><CardTitle>Form Edit Tim</CardTitle></CardHeader>
                    <CardContent>
                        <form action="#" className='space-y-3'>
                            <InputText
                                name="name"
                                label="Nama Tim"
                                type="text"
                                placeholder="Masukkan Nama Tim"
                                onChange={handleChange}
                                value={values.name}
                                errors={errors}
                            ></InputText>
                            <InputText
                                name="email"
                                label="Email"
                                type="email"
                                placeholder="Masukkan Email"
                                onChange={handleChange}
                                value={values.email}
                                errors={errors}
                            ></InputText>
                            <InputSelect 
                                name="status"
                                label="Status Petugas"
                                options={[{label: "aktif", value: 'aktif'}, {label: "Nonaktif", value: 'nonaktif'}]}
                                onChange={handleChange}
                                value={values.status}
                                errors={errors}
                            >
                            </InputSelect>
                            <InputText
                                name="password"
                                label="Password"
                                type="password"
                                placeholder="Masukkan Password"
                                onChange={handleChange}
                                value={values.password}
                                errors={errors}
                            ></InputText>
                            <InputText
                                name="password_confirmation"
                                type="password"
                                label="Password Confirmation"
                                value={values.password_confirmation}
                                onChange={handleChange}
                                // disabled={processing}
                                placeholder="Confirm password"
                            />
                            <div className="flex justify-end mt-3 space-x-3">
                                <Link href="/admin/tim">
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
