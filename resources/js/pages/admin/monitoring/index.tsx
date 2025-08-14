import InputSelect from '@/components/custom/form/input-select';
import InputText from '@/components/custom/form/input-text';
import { DataTableServer } from '@/components/custom/table/datatable-server';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFilterForm } from '@/hooks/userFormFilter';
import AppLayout from '@/layouts/app-layout';
import { columns } from '@/pages/admin/monitoring/columns';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Calendar1, CalendarDays, CheckCircle2, CodeXml, ListFilter, Plus, RotateCcw, UserCheck, Users, UserX } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Monitoring',
        href: '/admin/monitoring',
    },
];

export default function Index() {
    const { monitoring, tim, flash } = usePage().props
    const { data, handleChange, submit, reset } = useFilterForm(
        {
            tim_id: '',
            tanggal: '',
        },
        {
            baseRoute: '/admin/monitoring',
        },
    );
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Monitoring" />
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
                                <div className="text-muted-foreground text-sm">Total Monitoring</div>
                                <div className="bg-secondary rounded-full p-2">
                                    <Users className='text-primary size-4' />
                                </div>
                            </div>
                            <div className="text-lg font-semibold">{'0'}</div>
                        </CardContent>
                    </Card>
                    <Card className='col-span-2'>
                        <CardContent className='space-y-2'>
                            <div className="flex justify-between items-center">
                                <div className="text-muted-foreground text-sm">Kategori Monitoring Perbulan</div>
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
                                <div className="text-muted-foreground text-sm">Kategori Monitoring Pertahun</div>
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
                    <CardHeader><CardTitle>Filter lanjutan</CardTitle></CardHeader>
                    <CardContent className="">
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
                            <div className="text-end space-x-3">
                                <Button type="submit"><ListFilter />Filter</Button>
                                <Button variant={'outline'} onClick={reset}><RotateCcw /> Reset</Button>
                            </div>
                        </form>

                    </CardContent>
                </Card>
                <DataTableServer columns={columns} initialData={monitoring} />
            </div>
        </AppLayout>
    );
}
