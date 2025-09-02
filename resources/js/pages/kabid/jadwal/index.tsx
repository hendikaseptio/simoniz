import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TanggalIndo } from '@/utils/dateFormat';
import { Head, usePage } from '@inertiajs/react';
import { Route } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Jadwal Monitoring',
        href: '/kabid/jadwal',
    },
];

export default function Index() {
    const { jadwal } = usePage().props;
    const selectedDates = jadwal.map((item) => item.tanggal);

    const [selectedDateInfo, setSelectedDateInfo] = useState(null);
    function handleDateSelect(date) {
        if (!date || isNaN(new Date(date).getTime())) {
            setSelectedDateInfo({
                tanggal: null,
                items: [],
            });
            return;
        }
        const selected = new Date(date).toISOString().split('T')[0];
        const matched = jadwal.filter((item) => item.tanggal === selected);
        setSelectedDateInfo({
            tanggal: selected,
            items: matched,
        });
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Dokumen" />
            <div className="snap-x space-y-5 p-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="space-y-4 md:col-span-2">
                        <h1 className="text-2xl font-semibold text-gray-900">Jadwal Monitoring</h1>
                        <p className="mt-1 text-sm text-gray-600">Berikut adalah jadwal monitoring reklame yang telah dijadwalkan.</p>
                        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                            {jadwal.map((item) => (
                                <AccordionItem value={item.id} key={item.id}>
                                    <AccordionTrigger>{TanggalIndo(item.tanggal)}</AccordionTrigger>
                                    <AccordionContent className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-sm text-gray-500">Reklame</div>
                                            <div className="text-sm font-medium text-gray-900">{item.reklame.isi_konten}</div>
                                            <div className="text-sm text-gray-500">Jalan</div>
                                            <div className="text-sm font-medium text-gray-900">{item.reklame.jalan}</div>
                                            <div className="text-sm text-gray-500">Tim</div>
                                            <div className="text-sm font-medium text-gray-900">{item.tim.petugas_satu.name} & {item.tim.petugas_dua.name}</div>
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
                            selected={selectedDates}
                            onSelect={(date) => handleDateSelect(date)}
                            className="w-full rounded-md border shadow-sm"
                            captionLayout="dropdown"
                        />
                        {selectedDateInfo && (
                            <div className="mt-4 rounded-md border bg-white p-4 shadow-md">
                                {selectedDateInfo.items.length > 0 ? (
                                    selectedDateInfo.items.map((item) => (
                                        <div key={item.id}>
                                            <h3 className="mb-2 text-sm font-semibold text-gray-700">
                                                Jadwal pada {TanggalIndo(selectedDateInfo.tanggal)}
                                            </h3>
                                            <div className="mb-2 text-sm text-gray-800">
                                                <div><span className="font-medium">Reklame:</span> {item.reklame.isi_konten}</div>
                                                <div><span className="font-medium">Jalan:</span> {item.reklame.jalan}</div>
                                                <div><span className="font-medium">Tim:</span> {item.tim.petugas_satu.name} & {item.tim.petugas_dua.name}</div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">Tidak ada jadwal.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
