import InputPeta from '@/components/custom/form/input-peta';
import InputSelect from '@/components/custom/form/input-select';
import InputText from '@/components/custom/form/input-text';
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
        title: 'Data Reklame',
        href: '/admin/reklame',
    },
    {
        title: 'Edit Data Reklame',
        href: '/admin/reklame/edit',
    },
];

export default function EditReklame() {
    const { reklame, old } = usePage().props;
    const { values, errors, handleChange, handleSubmit } = useFormHandler(
        {
            id_pendaftaran: reklame?.id_pendaftaran || old?.id_pendaftaran || '',
            prev_id_pendaftaran: reklame?.prev_id_pendaftaran || old?.prev_id_pendaftaran || '',
            monitoring: reklame?.monitoring || old?.monitoring || '',
            perpanjangan: reklame?.perpanjangan || old?.perpanjangan || '',
            nama_pemohon: reklame?.nama_pemohon || old?.nama_pemohon || '',
            alamat_pemohon: reklame?.alamat_pemohon || old?.alamat_pemohon || '',
            nama_perusahaan: reklame?.nama_perusahaan || old?.nama_perusahaan || '',
            alamat_perusahaan: reklame?.alamat_perusahaan || old?.alamat_perusahaan || '',
            jalan: reklame?.jalan || old?.jalan || '',
            isi_konten: reklame?.isi_konten || old?.isi_konten || '',
            tgl_penetapan: reklame?.tgl_penetapan || old?.tgl_penetapan || '',
            tgl_selesai_penetapan: reklame?.tgl_selesai_penetapan || old?.tgl_selesai_penetapan || '',
            latitude: reklame?.latitude || old?.latitude || '',
            longitude: reklame?.longitude || old?.longitude || '',
            lokasi: reklame?.lokasi || old?.lokasi || '',
            foto_reklame: reklame?.foto_reklame || old?.foto_reklame || '',
            no_hp_pemohon: reklame?.no_hp_pemohon || old?.no_hp_pemohon || '',
            jenis_reklame: reklame?.jenis_reklame || old?.jenis_reklame || '',
            jumlah_sisi: reklame?.jumlah_sisi || old?.jumlah_sisi || '',
            keterangan_lokasi: reklame?.keterangan_lokasi || old?.keterangan_lokasi || '',
        },
        `/admin/reklame/${reklame?.id}`,
        'put',
    );
    const jenisReklameOptions = [
        { label: 'BANDO', values: 'BANDO' },
        { label: 'BILLBOARD TANAH NEGARA', values: 'BILLBOARD TANAH NEGARA' },
        { label: 'BILLBOARD TANAH SENDIRI', values: 'BILLBOARD TANAH SENDIRI' },
        { label: 'BILLBOARD TANAH SENDIRI BERSINAR', values: 'BILLBOARD TANAH SENDIRI BERSINAR' },
        { label: 'BILLBOARD TANAH NEGARA BERSINAR / NBTN', values: 'BILLBOARD TANAH NEGARA BERSINAR / NBTN' },
        { label: 'NEON BOX TANAH NEGARA', values: 'NEON BOX TANAH NEGARA' },
        { label: 'NEON BOX TANAH SENDIRI', values: 'NEON BOX TANAH SENDIRI' },
        { label: 'NON KONSTRUKSI ', values: 'NON KONSTRUKSI ' },
        { label: 'Large Electronic Display (LED)', values: 'Large Electronic Display (LED)' },
        { label: 'SS (SHOP SIGN)', values: 'SS (SHOP SIGN)' },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Reklame" />
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
                        <CardTitle>Form Edit Reklame</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form action="#">
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                <div className="space-y-3">
                                    <InputText
                                        name="id_pendaftaran"
                                        label="Id Pendaftaran"
                                        type="text"
                                        placeholder="Masukkan Id Pendaftaran"
                                        onChange={handleChange}
                                        value={values.id_pendaftaran}
                                        errors={errors}
                                    ></InputText>
                                    <InputText
                                        name="prev_id_pendaftaran"
                                        label="Id Pendaftaran Sebelumnya"
                                        type="text"
                                        placeholder="Masukkan Id Pendaftaran Sebelumnya"
                                        onChange={handleChange}
                                        value={values.prev_id_pendaftaran}
                                        errors={errors}
                                    ></InputText>
                                    <InputText
                                        name="nama_pemohon"
                                        label="Nama Pemohon"
                                        type="text"
                                        placeholder="Masukkan Nama Pemohon"
                                        onChange={handleChange}
                                        value={values.nama_pemohon}
                                        errors={errors}
                                    ></InputText>
                                    <InputTextarea
                                        name="alamat_pemohon"
                                        label="Alamat Pemohon"
                                        placeholder="Masukkan Alamat Pemohon"
                                        onChange={handleChange}
                                        value={values.alamat_pemohon}
                                        errors={errors}
                                    ></InputTextarea>
                                    <InputText
                                        name="no_hp_pemohon"
                                        label="No HP Pemohon"
                                        type="text"
                                        placeholder="Masukkan No HP Pemohon"
                                        onChange={handleChange}
                                        value={values.no_hp_pemohon}
                                        errors={errors}
                                    ></InputText>
                                    <InputText
                                        name="nama_perusahaan"
                                        label="Nama Perusahaan"
                                        type="text"
                                        placeholder="Masukkan Nama Perusahaan"
                                        onChange={handleChange}
                                        value={values.nama_perusahaan}
                                        errors={errors}
                                    ></InputText>
                                    <InputTextarea
                                        name="alamat_perusahaan"
                                        label="Alamat Perusahaan"
                                        placeholder="Masukkan Alamat Perusahaan"
                                        onChange={handleChange}
                                        value={values.alamat_perusahaan}
                                        errors={errors}
                                    ></InputTextarea>
                                    <InputText
                                        name="jalan"
                                        label="Jalan"
                                        type="text"
                                        placeholder="Masukkan Jalan"
                                        onChange={handleChange}
                                        value={values.jalan}
                                        errors={errors}
                                    ></InputText>
                                    <InputText
                                        name="isi_konten"
                                        label="Isi Konten"
                                        type="text"
                                        placeholder="Masukkan Isi Konten"
                                        onChange={handleChange}
                                        value={values.isi_konten}
                                        errors={errors}
                                    ></InputText>
                                    <InputText
                                        name="tgl_penetapan"
                                        label="Tanggal Penetapan"
                                        type="date"
                                        placeholder="Masukkan Tanggal Penetapan"
                                        onChange={handleChange}
                                        value={values.tgl_penetapan}
                                        errors={errors}
                                    ></InputText>
                                    <InputText
                                        name="tgl_selesai_penetapan"
                                        label="Tanggal Selesai Penetapan"
                                        type="date"
                                        placeholder="Masukkan Tanggal Selesai Penetapan"
                                        onChange={handleChange}
                                        value={values.tgl_selesai_penetapan}
                                        errors={errors}
                                    ></InputText>
                                    <InputPeta values={values} onChange={handleChange} errors={errors} />
                                </div>
                                <div className="space-y-3">
                                    <InputText
                                        name="lokasi"
                                        label="Lokasi"
                                        type="text"
                                        placeholder="Masukkan Lokasi"
                                        onChange={handleChange}
                                        value={values.lokasi}
                                        errors={errors}
                                    ></InputText>
                                    <InputText
                                        name="foto_reklame"
                                        label="Foto Reklame"
                                        type="text"
                                        placeholder="Masukkan Foto Reklame"
                                        onChange={handleChange}
                                        value={values.foto_reklame}
                                        errors={errors}
                                    ></InputText>
                                    <div className='rounded-md overflow-hidden shadow'>
                                        <img className='w-full' src={values.foto_reklame} alt="Preview Foto" />
                                    </div>
                                    <InputSelect
                                        name="jenis_reklame"
                                        label="Jenis Reklame"
                                        options={jenisReklameOptions}
                                        onChange={handleChange}
                                        value={values.jenis_reklame}
                                        errors={errors}
                                    ></InputSelect>
                                    <InputText
                                        name="jumlah_sisi"
                                        label="Jumlah Sisi"
                                        type="number"
                                        placeholder="Masukkan Jumlah Sisi"
                                        onChange={handleChange}
                                        value={values.jumlah_sisi}
                                        errors={errors}
                                    ></InputText>
                                    <InputTextarea
                                        name="keterangan_lokasi"
                                        label="Keterangan Lokasi"
                                        placeholder="Masukkan Keterangan Lokasi"
                                        onChange={handleChange}
                                        value={values.keterangan_lokasi}
                                        errors={errors}
                                    ></InputTextarea>
                                    <InputSelect
                                        name="monitoring"
                                        label="Monitoring"
                                        options={[
                                            { label: 'Iya', value: 'iya' },
                                            { label: 'Tidak', value: 'tidak' },
                                            { label: 'Kosong', value: 'tidak' },
                                        ]}
                                        onChange={handleChange}
                                        value={values.monitoring}
                                        errors={errors}
                                    ></InputSelect>
                                    <InputSelect
                                        name="perpanjangan"
                                        label="Perpanjangan"
                                        options={[
                                            { label: 'Sudah', value: 'sudah' },
                                            { label: 'Belum', value: 'belum' },
                                            { label: 'Kosong', value: 'kosong' },
                                        ]}
                                        onChange={handleChange}
                                        value={values.perpanjangan}
                                        errors={errors}
                                    ></InputSelect>
                                </div>
                            </div>
                            <div className="mt-3 flex justify-end space-x-3">
                                <Link href="/admin/reklame">
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
