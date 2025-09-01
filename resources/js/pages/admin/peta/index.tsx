import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ListFilter, MapPin, MapPinCheckInside, RotateCcw } from 'lucide-react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import ReactDOMServer from 'react-dom/server';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import InputSelect from '@/components/custom/form/input-select';
import InputText from '@/components/custom/form/input-text';
import { useFilterForm } from '@/hooks/userFormFilter';
import { Button } from '@/components/ui/button';
import { id } from 'date-fns/locale';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Peta Data Reklame',
        href: '/admin/peta',
    },
];

export default function Index() {
    const { reklame } = usePage().props;
   console.log(reklame)
    const { data, handleFilterChange, submit, reset } = useFilterForm(
        {
            cek_lapangan: '',
            id_pendaftaran: '',
            jalan: '',
            isi_konten: '',
        },
        {
            baseRoute: '/admin/peta',
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

    const markerIconHijau = new L.Icon({
        iconUrl: '/marker/marker1.png',
        iconSize: [24, 35],
        iconAnchor: [12, 10],
    });

    const markerIconMerah = new L.Icon({
        iconUrl: '/marker/marker3.png',
        iconSize: [24, 35],
        iconAnchor: [12, 10],
    });

    const markerIconBiru = new L.Icon({
        iconUrl: '/marker/marker2.png',
        iconSize: [24, 35],
        iconAnchor: [12, 10],
    });
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Reklame" />
            <div className="snap-x space-y-5 p-5">
                <Card>
                    <CardContent>
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                            defaultValue="item-1"
                        >
                            <AccordionItem value="item-1" >
                                <AccordionTrigger className='p-0'>Filter</AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 mt-4 text-balance z-0">
                                    <form
                                        method="get"
                                        className="space-y-3"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            submit();
                                        }}
                                    >
                                        <div className="grid grid-cols-2 gap-3">
                                            <InputSelect
                                                label={'Jalan'}
                                                name={'jalan'}
                                                options={optionsJalan}
                                                value={data.jalan}
                                                onChange={handleFilterChange}
                                            ></InputSelect>
                                            <InputText
                                                label="Tema Reklame"
                                                type="text"
                                                name="isi_konten"
                                                placeholder={'Masukkan tema reklame'}
                                                value={data.isi_konten}
                                                onChange={handleFilterChange}
                                            ></InputText>
                                            <InputSelect
                                                label={'Status Monitoring'}
                                                name={'cek_lapangan'}
                                                options={[
                                                    { value: 'sudah', label: 'Sudah' },
                                                    { value: 'belum', label: 'Belum' },
                                                ]}
                                                value={data.jalan}
                                                onChange={handleFilterChange}
                                            ></InputSelect>
                                            <InputText
                                                label={'Id Pendaftaran'}
                                                name={'id_pendaftaran'}
                                                type="text"
                                                placeholder={'Masukkan id pendaftaran'}
                                                value={data.id_pendaftaran}
                                                onChange={handleFilterChange}
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
                <MapContainer center={[-6.889836, 109.674591]} zoom={13} scrollWheelZoom={true} className="h-[500px] w-full rounded-md shadow z-0">
                    <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {reklame.map((item) => {

                        const status = item.monitoring[0]?.cek_lapangan;
                        console.log(item.monitoring[0]?.cek_lapangan)
                        let icon;
                        if (status === 'sudah') {
                            icon = markerIconHijau;
                        } else if (status === 'belum') {
                            icon = markerIconMerah;
                        } else {
                            icon = markerIconBiru;
                        }
                        return (
                            <Marker key={item.id} position={[item.latitude, item.longitude]} icon={icon}>
                                <Popup>
                                    <div className="space-y-1 text-sm">
                                        <div>
                                            <strong>ID:</strong> {item.id_pendaftaran}
                                        </div>
                                        <div>
                                            <strong>Perusahaan :</strong> {item.nama_perusahaan}
                                        </div>
                                        <div>
                                            <strong>Tema Reklame:</strong> {item.isi_konten || '-'}
                                        </div>
                                        <div>
                                            <strong>Jalan:</strong> {item.jalan || '-'}
                                        </div>
                                        <div>
                                            <strong>Status Monitoring:</strong> {item.monitoring[0]?.cek_lapangan || '-'}
                                        </div>
                                        <div>
                                            <img src={item.foto_reklame} alt="foto" />
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        )
                    })}
                </MapContainer>
            </div>
        </AppLayout>
    );
}
