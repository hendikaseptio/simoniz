import InputSelect from '@/components/custom/form/input-select';
import InputTextarea from '@/components/custom/form/input-textarea';
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
        title: 'Data Monitoring',
        href: '/admin/monitoring/',
    },
    {
        title: 'Edit Data Monitoring',
        href: '/admin/monitoring/edit',
    },
];

export default function EditTim() {
    const { monitoring, tim, user } = usePage().props;
    const { values, errors, handleChange, handleSubmit } = useFormHandler(
        {
            cek_lapangan: monitoring?.cek_lapangan || '',
            status: monitoring?.status || '',
            keberadaan_reklame: monitoring?.keberadaan_reklame || '',
            kelayakan_kontruksi: monitoring?.kelayakan_kontruksi || '',
            kesesuaian: monitoring?.kesesuaian || '',
            catatan: monitoring?.catatan || '',
            tl: monitoring?.tl || '',
        },
        `/admin/monitoring/${monitoring?.id}`,
        'put',
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Data Monitoring" />
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
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                <InputSelect
                                    name="cek_lapangan"
                                    label="Cek Lapangan"
                                    options={[
                                        { label: 'Sudah', value: 'sudah' },
                                        { label: 'Belum', value: 'belum' },
                                    ]}
                                    onChange={handleChange}
                                    value={values.cek_lapangan}
                                    errors={errors}
                                ></InputSelect>
                                <InputSelect
                                    name="status"
                                    label="Status Izin"
                                    options={[
                                        { label: 'Berlaku', value: 'berlaku' },
                                        { label: 'Tidak Berlaku', value: 'tidak berlaku' },
                                    ]}
                                    onChange={handleChange}
                                    value={values.status}
                                    errors={errors}
                                ></InputSelect>
                                <InputSelect
                                    name="status"
                                    label="Status Izin"
                                    options={[
                                        { label: 'Berlaku', value: 'berlaku' },
                                        { label: 'Tidak Berlaku', value: 'tidak berlaku' },
                                    ]}
                                    onChange={handleChange}
                                    value={values.status}
                                    errors={errors}
                                ></InputSelect>
                                <InputSelect
                                    name="keberadaan_reklame"
                                    label="Keberadaan Reklame"
                                    options={[
                                        { label: 'Ada', value: 'ada' },
                                        { label: 'Tidak Ada', value: 'tidak ada' },
                                    ]}
                                    onChange={handleChange}
                                    value={values.keberadaan_reklame}
                                    errors={errors}
                                ></InputSelect>
                                <InputSelect
                                    name="kelayakan_kontruksi"
                                    label="Kelayakan Kontruksi"
                                    options={[
                                        { label: 'Layak', value: 'layak' },
                                        { label: 'Tidak Layak', value: 'tidak layak' },
                                        { label: '-', value: '-' },
                                    ]}
                                    onChange={handleChange}
                                    value={values.kelayakan_kontruksi}
                                    errors={errors}
                                ></InputSelect>
                                <InputSelect
                                    name="kesesuaian"
                                    label="Kesesuaian"
                                    options={[
                                        { label: 'Sesuai', value: 'sesuai' },
                                        { label: 'Tidak Sesuai', value: 'tidak sesuai' },
                                        { label: '-', value: '-' },
                                    ]}
                                    onChange={handleChange}
                                    value={values.kesesuaian}
                                    errors={errors}
                                ></InputSelect>
                                <InputTextarea
                                    name="catatan"
                                    label="Catatan"
                                    onChange={handleChange}
                                    value={values.catatan}
                                    errors={errors}
                                ></InputTextarea>
                                <InputSelect
                                    name="tl"
                                    label="Tindak Lanjut"
                                    options={[
                                        { label: 'Ya', value: 'ya' },
                                        { label: 'Tidak', value: 'tidak' },
                                    ]}
                                    onChange={handleChange}
                                    value={values.tl}
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
