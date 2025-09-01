import InputRadioInline from '@/components/custom/form/input-radio-inline';
import InputTextarea from '@/components/custom/form/input-textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import useFormHandler from '@/hooks/useFormHandler';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TanggalIndo } from '@/utils/dateFormat';
import { Head, Link, usePage } from '@inertiajs/react';
import { AlertCircleIcon, CheckCircle2, Send, TriangleAlert } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Dokumen',
        href: '/kabid/approval',
    },
    {
        title: 'Approval Dokumen',
        href: '/kabid/approval/edit',
    },
];

export default function Edit() {
    const { dokumen, approval } = usePage().props;
    const { values, errors, handleChange, handleSubmit } = useFormHandler(
        {
            status: approval?.status || '',
            catatan: approval?.catatan || '',
        },
        `/kabid/approval/${approval?.id}`,
        'put',
    );
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Tim" />
            <div className="space-y-5 p-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <iframe className="h-screen w-full rounded-lg border shadow md:col-span-2" src={dokumen.path} />
                    <div className='space-y-4'>
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
                            <CardContent>
                                <h2 className="mb-2 text-lg font-semibold">Status Approval</h2>
                                {approval ? (
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                                            <div className="font-medium">Tanggal Permintaan</div>
                                            <div>
                                                <span className="mr-3">:</span> {TanggalIndo(approval.created_at)}
                                            </div>
                                        </div>
                                        <hr />
                                        <form action="#" className='space-y-4'>
                                            <InputRadioInline
                                                name={'status'}
                                                label={'Status Approval'}
                                                options={[
                                                    { label: 'Setuju', value: 'setuju' },
                                                    { label: 'Tidak Setuju', value: 'tidak setuju' },
                                                ]}
                                                // checked={values.status}
                                                value={values.status}
                                                onChange={handleChange}
                                                errors={errors}
                                            ></InputRadioInline>
                                            <InputTextarea
                                                label='Catatan'
                                                name='catatan'
                                                value={values.catatan}
                                                onChange={handleChange}
                                                errors={errors}
                                            ></InputTextarea>
                                            <Button onClick={handleSubmit} className='w-full'>
                                                <Send />
                                                Simpan
                                            </Button>
                                        </form>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <Alert>
                                            <TriangleAlert />
                                            <AlertTitle>Dokumen Belum Diajukan Approval</AlertTitle>
                                            <AlertDescription>Klik tombol dibawah ini untuk mengajukan approval</AlertDescription>
                                        </Alert>
                                        <Link href={`/kabid/approval/${approval.id}/sendApproval`}>
                                            <Button className="w-full">
                                                <Send /> Kirim Permintaan Approval
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
