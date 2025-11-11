import InputFile from '@/components/custom/form/input-file';
import InputPeta from '@/components/custom/form/input-peta';
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
type EditTim = {
    cek_lapangan: string;
    status: string;
    keberadaan_reklame: string;
    kelayakan_kontruksi: string;
    kesesuaian: string;
    catatan: string;
    tl: string;
};

export default function EditTim() {
    const { monitoring } = usePage().props;
    const { values, errors, handleChange, handleSubmit } = useFormHandler(
        {
            cek_lapangan: monitoring?.cek_lapangan || '',
            status: monitoring?.status || '',
            keberadaan_reklame: monitoring?.keberadaan_reklame || '',
            kelayakan_kontruksi: monitoring?.kelayakan_kontruksi || '',
            kesesuaian: monitoring?.kesesuaian || '',
            catatan: monitoring?.catatan || '',
            tl: monitoring?.tl || '',
            latitude: monitoring?.latitude || '',
            longitude: monitoring?.longitude || '',
            foto: monitoring?.foto || '',
        },
        `/admin/monitoring/${monitoring?.id}`,
        'put',
    );
    console.log(monitoring);
    function handleAmbilLokasi() {
        if (!navigator.geolocation) {
            alert('Geolocation tidak didukung di browser ini');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setValues({
                    ...values,
                    latitude: position.coords.latitude.toString(),
                    longitude: position.coords.longitude.toString(),
                });
            },
            (error) => {
                alert('Gagal mengambil lokasi: ' + error.message);
            },
            { enableHighAccuracy: true, timeout: 10000 },
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Data Monitoring" />
            <div className="space-y-5 p-5">
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
                    <CardHeader>
                        <CardTitle>Form Edit Tim</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form action="#" className="space-y-3">
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
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
                                <InputPeta values={values} onChange={handleChange} errors={errors} />
                                <InputFile
                                    name={'foto'}
                                    label={'Foto'}
                                    onChange={handleChange}
                                    errors={errors}
                                    accept={'image/*'}
                                    initialFile={`/storage/${monitoring?.foto}` || null}
                                    multiple={false}
                                ></InputFile>
                            </div>
                            <div className="mt-3 flex justify-end space-x-3">
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
