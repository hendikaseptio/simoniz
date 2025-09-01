import InputSelect from '@/components/custom/form/input-select';
import InputText from '@/components/custom/form/input-text';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useFormHandler from '@/hooks/useFormHandler';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { AlertCircleIcon, ArrowLeft, Send } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Tim',
        href: '/admin/tim/',
    },
    {
        title: 'Edit Data Tim',
        href: '/admin/tim/edit',
    },
];

export default function EditTim() {
    const { jadwal, tim, reklame } = usePage().props;
    const { values, errors, handleChange, handleSubmit } = useFormHandler(
        {
            reklame_id: jadwal?.reklame_id || '',
            tim_id: jadwal?.tim_id || '',
            tanggal: jadwal?.tanggal || '',
        },
        `/admin/jadwal/${jadwal?.id}`,
        'put',
    );
    const handleTanggalChange = (e) => {
        const val = e.target.value;
        handleChange(e);
        router.get(
            route('admin.jadwal.edit', jadwal?.id),
            { tanggal: val },
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
            },
        );
    };
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
                            <InputText
                                name="tanggal"
                                label="Tanggal"
                                type="date"
                                onChange={handleTanggalChange}
                                value={values.tanggal}
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
