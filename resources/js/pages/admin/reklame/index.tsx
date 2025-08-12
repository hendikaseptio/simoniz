import InputSelect from '@/components/custom/form/input-select';
import InputText from '@/components/custom/form/input-text';
import { DataTableServer } from '@/components/custom/table/datatable-server';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useFilterForm } from '@/hooks/userFormFilter';
import AppLayout from '@/layouts/app-layout';
import { columns } from '@/pages/admin/reklame/columns';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { CheckCircle2, FileDown, ListFilter, Plus, Presentation, RotateCcw, Telescope, TvMinimal } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Reklame',
        href: '/admin/reklame',
    },
];

export default function Index() {
    const { reklame, monitoring, jenis_reklame, flash } = usePage().props;
    const { data, handleChange, submit, reset } = useFilterForm(
        {
            start_date: '',
            end_date: '',
            jalan: '',
            isi_konten: '',
        },
        {
            baseRoute: '/admin/reklame',
        },
    );
    const optionsJalan = [
        { value: '', label: 'Semua Jalan' },
        { value: 'Jl. Kurinci', label: 'Jl. Kurinci' },
        { value: 'Jl. Trucuk Manggar', label: 'Jl. Trucuk Manggar' },
        { value: 'Jl. Singosari', label: 'Jl. Singosari' },
        { value: 'Jl. KH. Mansyur', label: 'Jl. KH. Mansyur' },
        { value: 'Jl. KHM. Mansyur', label: 'Jl. KHM. Mansyur' },
        { value: 'Jl. Irian', label: 'Jl. Irian' },
        { value: 'Jl. Sriwijaya', label: 'Jl. Sriwijaya' },
        { value: 'Jl. Urip Sumoharjo', label: 'Jl. Urip Sumoharjo' },
        { value: 'Jl. Dharma Bakti', label: 'Jl. Dharma Bakti' },
        { value: 'Jl. Gatot Subroto', label: 'Jl. Gatot Subroto' },
        { value: 'Jl. Letjen Soeprapto', label: 'Jl. Letjen Soeprapto' },
        { value: 'Jl. Setia Bakti', label: 'Jl. Setia Bakti' },
        { value: 'Jl. Pelita', label: 'Jl. Pelita' },
        { value: 'Jl. Majapahit', label: 'Jl. Majapahit' },
        { value: 'Jl. Binagriya Raya', label: 'Jl. Binagriya Raya' },
        { value: 'Jl.KH. Ahmad Dahlan', label: 'Jl.KH. Ahmad Dahlan' },
        { value: 'Jl. Merdeka', label: 'Jl. Merdeka' },
        { value: 'Jl. Pemuda', label: 'Jl. Pemuda' },
        { value: 'Jl. Gajah Mada', label: 'Jl. Gajah Mada' },
        { value: 'Jl. Angkatan 45', label: 'Jl. Angkatan 45' },
        { value: 'Jl. Perintis Kemerdekaan', label: 'Jl. Perintis Kemerdekaan' },
        { value: 'Jl. Veteran', label: 'Jl. Veteran' },
        { value: 'Jl. Tentara Pelajar', label: 'Jl. Tentara Pelajar' },
        { value: 'Jl. Kusuma Bangsa', label: 'Jl. Kusuma Bangsa' },
        { value: 'Jl. Jetayu', label: 'Jl. Jetayu' },
        { value: 'Jl. WR Supratman', label: 'Jl. WR Supratman' },
        { value: 'Jl. Raden Saleh', label: 'Jl. Raden Saleh' },
        { value: 'Jl. Manggis', label: 'Jl. Manggis' },
        { value: 'Jl. Kenanga', label: 'Jl. Kenanga' },
        { value: 'Jl. Cempaka', label: 'Jl. Cempaka' },
        { value: 'Jl. Semarang', label: 'Jl. Semarang' },
        { value: 'Jl. Patiunus', label: 'Jl. Patiunus' },
        { value: 'Jl. Jlamprang', label: 'Jl. Jlamprang' },
        { value: 'Jl. Seruni', label: 'Jl. Seruni' },
        { value: 'Jl. Ki Mangun Sarkoro', label: 'Jl. Ki Mangun Sarkoro' },
        { value: 'Jl. P. Diponegoro', label: 'Jl. P. Diponegoro' },
        { value: 'Jl. Progo', label: 'Jl. Progo' },
        { value: 'Jl. Salak', label: 'Jl. Salak' },
        { value: 'Jl. Imam Bonjol', label: 'Jl. Imam Bonjol' },
        { value: 'Jl. Bandung', label: 'Jl. Bandung' },
        { value: 'Jl. Hasanudin', label: 'Jl. Hasanudin' },
        { value: 'Jl. Sultan Agung', label: 'Jl. Sultan Agung' },
        { value: 'Jl. Agus Salim', label: 'Jl. Agus Salim' },
        { value: 'Jl. KH. Abdul Gaffar Ismail', label: 'Jl. KH. Abdul Gaffar Ismail' },
        { value: 'Jl. Dr. Cipto', label: 'Jl. Dr. Cipto' },
        { value: 'Jl. Nusantara', label: 'Jl. Nusantara' },
        { value: 'Jl. Alun-Alun', label: 'Jl. Alun-Alun' },
        { value: 'Jl. KH. Wahid Hasyim', label: 'Jl. KH. Wahid Hasyim' },
        { value: 'Jl. RA Kartini', label: 'Jl. RA Kartini' },
        { value: 'Jl. Kintamani', label: 'Jl. Kintamani' },
        { value: 'Jl. Hayam Wuruk', label: 'Jl. Hayam Wuruk' },
        { value: 'Jl. Jenderal Sudirman', label: 'Jl. Jenderal Sudirman' },
        { value: 'Jl. Dr. Sutomo', label: 'Jl. Dr. Sutomo' },
        { value: 'Jl. Ahmad Yani', label: 'Jl. Ahmad Yani' },
        { value: 'Jl. Hos Cokroaminoto', label: 'Jl. Hos Cokroaminoto' },
        { value: 'Jl. Raya Kertoharjo', label: 'Jl. Raya Kertoharjo' },
        { value: 'Jl. Dr. Setia Budi', label: 'Jl. Dr. Setia Budi' },
        { value: 'Jl. Dr. Wahidin', label: 'Jl. Dr. Wahidin' },
        { value: 'Jl. Ampera', label: 'Jl. Ampera' },
        { value: 'Jl. Otto Iskandardinata', label: 'Jl. Otto Iskandardinata' },
        { value: 'Jl. Comodore Adi Sucipto', label: 'Jl. Comodore Adi Sucipto' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Reklame" />
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
                                <div className="text-sm text-muted-foreground">Total Reklame</div>
                                <div className="rounded-full bg-secondary p-2">
                                    <Presentation className="size-4 text-primary" />
                                </div>
                            </div>
                            <div className="text-lg font-semibold">{reklame.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">Status Monitoring</div>
                                <div className="rounded-full bg-secondary p-2">
                                    <Telescope className="size-4 text-primary" />
                                </div>
                            </div>
                            <div className="flex-inline items-center text-sm">
                                <Link className="m-1 inline-block" href={route('admin.reklame.index', { monitoring: 'iya' })} preserveScroll>
                                    <Badge>Iya: {monitoring.iya}</Badge>
                                </Link>
                                <Link className="m-1 inline-block" href={route('admin.reklame.index', { monitoring: 'tidak' })} preserveScroll>
                                    <Badge variant={'destructive'}>Tidak: {monitoring.tidak}</Badge>
                                </Link>
                                <Link className="m-1 inline-block" href={route('admin.reklame.index', { monitoring: 'kosong' })} preserveScroll>
                                    <Badge variant={'secondary'}>Kosong: {monitoring.kosong}</Badge>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className='col-span-2'>
                        <CardContent className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">Jenis Reklame</div>
                                <div className="rounded-full bg-secondary p-2">
                                    <TvMinimal className="size-4 text-primary" />
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center text-sm">
                                {Object.entries(jenis_reklame).map(([key, value]) => (
                                    <Link
                                        key={key}
                                        className="m-1 inline-block"
                                        href={route('admin.reklame.index', { jenis_reklame: key })}
                                        preserveScroll
                                    >
                                        <Badge>{key.replaceAll('_', ' ')}: {value}</Badge>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                </div>
                <Card>
                    <CardContent className="">
                        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="py-0">Filter lanjutan</AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 py-4 text-balance">
                                    <form
                                        method="get"
                                        className="space-y-3"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            submit();
                                        }}
                                    >
                                        <InputSelect
                                            label={'Jalan'}
                                            name={'jalan'}
                                            options={optionsJalan}
                                            value={data.jalan}
                                            onChange={handleChange}
                                        ></InputSelect>
                                        <InputText
                                            label="Tema Reklame"
                                            type="text"
                                            name="isi_konten"
                                            placeholder={'Masukkan tema reklame'}
                                            value={data.isi_konten}
                                            onChange={handleChange}
                                        ></InputText>
                                        <div className="grid grid-cols-2 gap-3">
                                            <InputText
                                                label="Tanggal Awal Penetapan"
                                                type="date"
                                                name="start_date"
                                                value={data.start_date}
                                                onChange={handleChange}
                                            />
                                            <InputText
                                                label="Tanggal Akhir Penetapan"
                                                type="date"
                                                name="end_date"
                                                value={data.end_date}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="text-end space-x-3">
                                            <Button type="submit"><ListFilter />Filter</Button>
                                            <Button variant={'outline'} onClick={reset}><RotateCcw /> Reset</Button>
                                        </div>
                                    </form>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
                <div className="flex justify-end gap-3">
                    <Link href="/admin/import">
                        <Button>
                            <FileDown />
                            Import Excel
                        </Button>
                    </Link>
                    <Link href="/admin/reklame/create">
                        <Button>
                            <Plus />
                            Tambah Data
                        </Button>
                    </Link>
                </div>
                <DataTableServer columns={columns} initialData={reklame} />
            </div>
        </AppLayout>
    );
}
