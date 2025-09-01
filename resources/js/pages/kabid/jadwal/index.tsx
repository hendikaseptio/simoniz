import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Calendar } from '@/components/ui/calendar';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TanggalIndo } from '@/utils/dateFormat';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Jadwal Monitoring',
        href: '/kabid/jadwal',
    },
];

export default function Index() {
    const { jadwal } = usePage().props;
    const selectedDates = jadwal.map((item) => item.tanggal);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Dokumen" />
            <div className="snap-x space-y-5 p-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="space-y-4 md:col-span-2">
                        <h1 className="text-2xl font-semibold text-gray-900">Jadwal Monitoring</h1>
                        <p className="mt-1 text-sm text-gray-600">Berikut adalah jadwal monitoring reklame yang telah dijadwalkan.</p>
                        {/* <hr className="my-4" /> */}
                        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                            {jadwal.map((item) => (
                                <AccordionItem value={item.id}>
                                    <AccordionTrigger>{TanggalIndo(item.tanggal)}</AccordionTrigger>
                                    <AccordionContent className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-sm text-gray-500">Reklame</div>
                                            <div className="text-sm font-medium text-gray-900">{item.reklame.isi_konten}</div>
                                            <div className="text-sm text-gray-500">Jalan</div>
                                            <div className="text-sm font-medium text-gray-900">{item.reklame.jalan}</div>
                                            <div className="text-sm text-gray-500">Tim</div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {item.tim.petugas_satu.name} & {item.tim.petugas_dua.name}
                                            </div>
                                        </div>
                                        <div>
                                            <img src={item.reklame.foto_reklame} alt="" />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                    <div className="sticky top-[10px] self-start">
                        <Calendar
                            mode="multiple"
                            numberOfMonths={1}
                            defaultMonth={selectedDates[0]}
                            required
                            selected={selectedDates}
                            max={10}
                            className="w-full rounded-lg border shadow-sm"
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
