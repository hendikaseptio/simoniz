import InputSelect from '@/components/custom/form/input-select';
import InputText from '@/components/custom/form/input-text';
import { DataTableServer } from '@/components/custom/table/datatable-server';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFilterForm } from '@/hooks/userFormFilter';
import AppLayout from '@/layouts/app-layout';
import { columns } from '@/pages/tim/jadwal/columns';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Calendar1, CalendarDays, CheckCircle2, ListFilter, Plus, Printer, RotateCcw } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Jadwal',
        href: '/tim/jadwal',
    },
];

export default function Index() {
    const { jadwal, tim, jumlahJadwalAktif, jumlahJadwalTidakAktif, flash } = usePage().props;
    console.log('jadwal', jadwal);
    const { data, handleChange, submit, reset } = useFilterForm(
        {
            tim_id: '',
            tanggal: '',
        },
        {
            baseRoute: '/tim/jadwal',
        },
    );
    const jadwal_id =  jadwal?.data?.map((j: any) => j.id) || [];
    
    const handleGenerateBatch = () => {
        if (jadwal_id.length === 0) {
            alert('Tidak ada data jadwal untuk digenerate.');
            return;
        }
        router.post(
            `/tim/generate-surat-tugas-batch/`,
            { jadwal_id },
            {
                preserveScroll: true,
                replace: true,
                preserveState: false,
            },
        );
    };
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
                                    onChange={handleChange}
                                ></InputSelect>
                                <InputText
                                    label="Tanggal"
                                    type="date"
                                    name="tanggal"
                                    placeholder={'Masukkan Tanggal'}
                                    value={data.tanggal}
                                    onChange={handleChange}
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
                    <Button
                        onClick={handleGenerateBatch}
                        
                    >
                        <Printer size={16} />
                        Generate Batch Surat Tugas
                    </Button>
                    <Link href="/tim/jadwal/create">
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
