import InputMultiSelect from '@/components/custom/form/input-multi-select';
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
import { useEffect, useState } from 'react';

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

export default function Create() {
    const { user, tim } = usePage().props
    const { values, errors, handleChange, handleSubmit } = useFormHandler(
        {
            tim_id: '',
            tanggal: '',
            id_pendaftaran: '',
            tim_st: '',
        },
        '/admin/jadwal',
    );
    const [filteredTimOptions, setFilteredTimOptions] = useState([]);
    const [filteredTimStOptions, setFilteredTimStOptions] = useState([]);

    useEffect(() => {
        if (!values.tanggal) return;

        // Simulasi filter: misalnya hanya tampilkan tim yg dibuat sebelum tanggal dipilih
        const filteredTim = tim
            .filter((t: any) => new Date(t.created_at) <= new Date(values.tanggal))
            .map((t: any) => ({
                label: `Tim ${t.id}`,
                value: t.id,
            }));

        // Tim ST: misalnya tampilkan semua user (atau bisa juga difilter)
        const filteredTimSt = user.map((u: any) => ({
            label: u.name,
            value: u.id,
        }));

        setFilteredTimOptions(filteredTim);
        setFilteredTimStOptions(filteredTimSt);
    }, [values.tanggal]);
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
                    <CardHeader><CardTitle>Form Tambah Jadwal</CardTitle></CardHeader>
                    <CardContent>
                        <form action="#" className='space-y-3'>
                            <InputSelect
                                name="tim_id"
                                label="Tim Jalan"
                                options={filteredTimOptions}
                                onChange={handleChange}
                                value={values.tim_id}
                                errors={errors}
                            />
                            <InputMultiSelect
                                name="tim_st"
                                label="Tim SK (contoh: 1,3,4)"
                                options={filteredTimStOptions}
                                onChange={handleChange}
                                value={values.tim_st}
                                errors={errors}
                            />
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                <InputText
                                    name="tanggal"
                                    label="Tanggal"
                                    type="date"
                                    onChange={handleChange}
                                    value={values.tanggal}
                                    errors={errors}
                                />
                                <InputText
                                    name="id_pendaftaran"
                                    label="ID Pendaftaran"
                                    onChange={handleChange}
                                    value={values.id_pendaftaran}
                                    errors={errors}
                                />
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
