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
    const { user, tim, reklame } = usePage().props
    const { values, errors, handleChange, handleSubmit } = useFormHandler(
        {
            tim_id: '',
            tanggal: '',
            reklame_id: '',
            tim_st: '',
        },
        '/admin/jadwal',
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
                    <CardHeader><CardTitle>Form Tambah Jadwal</CardTitle></CardHeader>
                    <CardContent>
                        <form action="#" className='space-y-3'>
                            <InputSelect
                                name="reklame_id"
                                label="ID Pendafataran Izin"
                                options={reklame.map((u: any) => ({
                                    label: `${u.id_pendaftaran} - ${u.nama_perusahaan} (${u.jenis_reklame}/${u.isi_konten})`,
                                    value: u.id,
                                }))}
                                onChange={handleChange}
                                value={values.reklame_id}
                                errors={errors}
                            />
                            <InputSelect
                                name="tim_id"
                                label="Tim Jalan"
                                options={tim.map((u: any) => ({
                                    label: `${u.petugas_satu.name} & ${u.petugas_dua.name} (${u.bulan}-${u.tahun})`,
                                    value: u.id,
                                }))}
                                onChange={handleChange}
                                value={values.tim_id}
                                errors={errors}
                            />
                            <InputMultiSelect
                                name="tim_st"
                                label="Tim SK (contoh: 1,3,4)"
                                options={user.map((u: any) => ({
                                    label: u.name,
                                    value: u.id,
                                }))
                                }
                                onChange={handleChange}
                                value={values.tim_st}
                                errors={errors}
                            />
                            <InputText
                                name="tanggal"
                                label="Tanggal"
                                type="date"
                                onChange={handleChange}
                                value={values.tanggal}
                                errors={errors}
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
