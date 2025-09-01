import InputSelect from '@/components/custom/form/input-select';
import InputText from '@/components/custom/form/input-text';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useFormHandler from '@/hooks/useFormHandler';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import { Head, Link, usePage } from '@inertiajs/react';
import { AlertCircleIcon, ArrowLeft, CircleOff, Send } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Tim',
        href: '/admin/tim',
    },
    {
        title: 'Tambah Data Tim',
        href: '/admin/tim/create',
    },
];

export default function Create() {
    const { user } = usePage().props
    const { values, errors, handleChange, handleSubmit } = useFormHandler(
        {
            petugas1: '',
            petugas2: '',
            bulan: '',
            tahun: '',
        },
        '/admin/tim',
    );
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let y = currentYear - 10; y <= currentYear + 10; y++) {
        years.push({ label: y.toString(), value: y.toString() });
    }
    const bulanOptions = [
        { label: "Januari", value: "januari" },
        { label: "Februari", value: "februari" },
        { label: "Maret", value: "maret" },
        { label: "April", value: "april" },
        { label: "Mei", value: "mei" },
        { label: "Juni", value: "juni" },
        { label: "Juli", value: "juli" },
        { label: "Agustus", value: "agustus" },
        { label: "September", value: "september" },
        { label: "Oktober", value: "oktober" },
        { label: "November", value: "november" },
        { label: "Desember", value: "desember" },
    ];
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
                    <CardHeader><CardTitle>Form Tambah Tim</CardTitle></CardHeader>
                    <CardContent>
                        <form action="#" className='space-y-3'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                <InputSelect
                                    name="petugas1"
                                    label="Petugas 1"
                                    options={
                                        user.map((item) => (
                                            { label: item.name, value: item.id }
                                        ))
                                    }
                                    onChange={handleChange}
                                    value={values.petugas1}
                                    errors={errors}
                                ></InputSelect>
                                <InputSelect
                                    name="petugas2"
                                    label="Petugas 2"
                                    options={
                                        user.map((item) => (
                                            { label: item.name, value: item.id }
                                        ))
                                    }
                                    onChange={handleChange}
                                    value={values.petugas2}
                                    errors={errors}
                                ></InputSelect>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                <InputSelect
                                    name="bulan"
                                    label="Bulan"
                                    options={bulanOptions}
                                    onChange={handleChange}
                                    value={values.bulan}
                                    errors={errors}
                                >
                                </InputSelect>
                                <InputSelect
                                    name="tahun"
                                    label="Tahun"
                                    options={years}
                                    onChange={handleChange}
                                    value={values.tahun}
                                    errors={errors}
                                ></InputSelect>
                            </div>
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
