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
import { columns } from '@/pages/admin/jadwal/columns';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Calendar1, CalendarDays, CheckCircle2, CodeXml, ListFilter, Plus, RotateCcw, UserCheck, Users, UserX } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Jadwal',
        href: '/admin/jadwal',
    },
];

export default function Index() {
    const { jadwal, flash } = usePage().props
    const { data, handleChange, submit, reset } = useFilterForm(
        {
            bulan: '',
            tahun: '',
        },
        {
            baseRoute: '/admin/jadwal',
        },
    );
    const optionsBulan = [
        { label: "Januari", value: "januari" },
        { label: "Februari", value: "februari" },
        { label: "Maret", value: "maret" },
        { label: "April", value: "april" },
        { label: "Mei", value: "mei" },
        { label: "Juni", value: "juni" },
        { label: "Juli", value: "juli" },
        { label: "Agustus", value: "agustus" },
        { label: "September", value: "september" },
        { label: "Oktober", value: "oktober" },
        { label: "November", value: "november" },
        { label: "Desember", value: "desember" },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Jadwal" />
            <div className="snap-x p-5 space-y-5">
                {flash.success && (
                    <Alert className="border-teal-500 bg-teal-100 dark:bg-teal-950">
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertTitle className="text-teal-600 dark:text-teal-400">Berhasil!</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                )}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mb-5'>
                    <Card>
                        <CardContent className='space-y-2'>
                            <div className="flex justify-between items-center">
                                <div className="text-muted-foreground text-sm">Total Jadwal</div>
                                <div className="bg-secondary rounded-full p-2">
                                    <Users className='text-primary size-4' />
                                </div>
                            </div>
                            <div className="text-lg font-semibold">{jadwal.total}</div>
                        </CardContent>
                    </Card>
                    <Card className='col-span-2'>
                        <CardContent className='space-y-2'>
                            <div className="flex justify-between items-center">
                                <div className="text-muted-foreground text-sm">Kategori Jadwal Perbulan</div>
                                <div className="bg-secondary rounded-full p-2">
                                    <Calendar1 className='text-primary size-4' />
                                </div>
                            </div>
                            <div className="text-lg font-semibold">
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className='space-y-2'>
                            <div className="flex justify-between items-center">
                                <div className="text-muted-foreground text-sm">Kategori Jadwal Pertahun</div>
                                <div className="bg-secondary rounded-full p-2">
                                    <CalendarDays className='text-primary size-4' />
                                </div>
                            </div>
                            <div className="text-lg font-semibold">
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
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <InputSelect
                                                label={'Bulan'}
                                                name={'bulan'}
                                                options={optionsBulan}
                                                value={data.bulan}
                                                onChange={handleChange}
                                            ></InputSelect>
                                            <InputText
                                                label="Tahun"
                                                type="number"
                                                name="tahun"
                                                placeholder={'Masukkan Periode Tahun'}
                                                value={data.tahun}
                                                onChange={handleChange}
                                            ></InputText>
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
                <div className='flex justify-end'>
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
