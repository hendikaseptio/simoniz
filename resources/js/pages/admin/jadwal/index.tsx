import InputSelect from '@/components/custom/form/input-select';
import InputText from '@/components/custom/form/input-text';
import { DataTableServer } from '@/components/custom/table/datatable-server';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useFormHandler from '@/hooks/useFormHandler';
import { useFilterForm } from '@/hooks/userFormFilter';
import AppLayout from '@/layouts/app-layout';
import { columns } from '@/pages/admin/jadwal/columns';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Calendar1, CalendarDays, CheckCircle2, ListFilter, Plus, Printer, RotateCcw, Send, X } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Jadwal',
        href: '/admin/jadwal',
    },
];

export default function Index() {
    const { jadwal, tim, jumlahJadwalAktif, jumlahJadwalTidakAktif, flash } = usePage().props;
    const { data, handleFilterChange, submit, reset } = useFilterForm(
        {
            tim_id: '',
            tanggal: '',
        },
        {
            baseRoute: '/admin/jadwal',
        },
    );
    const { values, errors, handleChange, handleSubmit } = useFormHandler(
        {
            bulan: '',
            tahun: '',
        },
        '/admin/generate-surat-tugas-batch',
    );
    const optionsBulan = [
        { label: "Januari", value: 1 },
        { label: "Februari", value: 2 },
        { label: "Maret", value: 3 },
        { label: "April", value: 4 },
        { label: "Mei", value: 5 },
        { label: "Juni", value: 6 },
        { label: "Juli", value: 7 },
        { label: "Agustus", value: 8 },
        { label: "September", value: 9 },
        { label: "Oktober", value: 10 },
        { label: "November", value: 11 },
        { label: "Desember", value: 12 },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Jadwal" />
            <div className="snap-x space-y-5 p-5">
                {flash.success && (
                    <Alert className="border-teal-500 bg-teal-100 dark:bg-teal-950">
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertTitle className="text-teal-600 dark:text-teal-400">Berhasil!</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                )}
                <div className="mb-5 grid grid-cols-2 gap-5 md:grid-cols-4">
                    <Card>
                        <CardContent className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">Total Jadwal</div>
                                <div className="rounded-full bg-secondary p-2">
                                    <CalendarDays className="size-4 text-primary" />
                                </div>
                            </div>
                            <div className="text-lg font-semibold">{jadwal.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">Total Jadwal Selesai</div>
                                <div className="rounded-full bg-secondary p-2">
                                    <CalendarDays className="size-4 text-primary" />
                                </div>
                            </div>
                            <div className="text-lg font-semibold">{jumlahJadwalTidakAktif}</div>
                        </CardContent>
                    </Card>
                    <Card className="col-span-2">
                        <CardContent className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">Total Jadwal Aktif</div>
                                <div className="rounded-full bg-secondary p-2">
                                    <Calendar1 className="size-4 text-primary" />
                                </div>
                            </div>
                            <div className="text-lg font-semibold">{jumlahJadwalAktif}</div>
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Filter lanjutan</CardTitle>
                    </CardHeader>
                    <CardContent className="">
                        <form
                            method="get"
                            className="space-y-3"
                            onSubmit={(e) => {
                                e.preventDefault();
                                submit();
                            }}
                        >
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                <InputSelect
                                    label={'Tim Jalan'}
                                    name={'tim_id'}
                                    options={tim.map((u: any) => ({
                                        label: `${u.petugas_satu.name} & ${u.petugas_dua.name} (${u.bulan}-${u.tahun})`,
                                        value: u.id,
                                    }))}
                                    value={data.tim_id}
                                    onChange={handleFilterChange}
                                ></InputSelect>
                                <InputText
                                    label="Tanggal"
                                    type="date"
                                    name="tanggal"
                                    placeholder={'Masukkan Tanggal'}
                                    value={data.tanggal}
                                    onChange={handleFilterChange}
                                ></InputText>
                            </div>
                            <div className="space-x-3 text-end">
                                <Button type="submit">
                                    <ListFilter />
                                    Filter
                                </Button>
                                <Button variant={'outline'} onClick={reset}>
                                    <RotateCcw /> Reset
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <div className="flex justify-end gap-3">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline"><Printer />Generate Surat Tugas</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Pilih Bulan dan Tahun</AlertDialogTitle>
                                <AlertDialogDescription>
                                    <div className="grid grid-cols-2 gap-3">
                                        <InputSelect
                                            label={'Bulan'}
                                            name={'bulan'}
                                            options={optionsBulan}
                                            value={values.bulan}
                                            onChange={handleChange}
                                            errors={errors}
                                        ></InputSelect>

                                        <InputText
                                            label="Tahun"
                                            type="number"
                                            name="tahun"
                                            placeholder={'Masukkan Periode Tahun'}
                                            value={values.tahun}
                                            onChange={handleChange}
                                            errors={errors}
                                        ></InputText>
                                    </div>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel><X/>Batal</AlertDialogCancel>
                                <AlertDialogAction onClick={handleSubmit}><Send/> Buat Surat</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <Link href="/admin/jadwal/create">
                        <Button>
                            <Plus />
                            Tambah Data{' '}
                        </Button>
                    </Link>
                </div>
                <DataTableServer columns={columns} initialData={jadwal} />
            </div>
        </AppLayout>
    );
}
