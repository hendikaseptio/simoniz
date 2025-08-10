import { Label } from '@/components/ui/label';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import InputText from './input-text';

const markerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const MapClickHandler = ({ setCoordinates }) => {
    useMapEvents({
        click(e) {
            const lat = e.latlng.lat.toFixed(7);
            const lng = e.latlng.lng.toFixed(7);
            setCoordinates(lat, lng);
        },
    });
    return null;
};

const InputPeta = ({ values, onChange, errors }) => {
    const latitude = parseFloat(values.latitude) || -6.888;
    const longitude = parseFloat(values.longitude) || 109.6753;

    const setCoordinates = (lat, lng) => {
        onChange({ target: { name: 'latitude', value: lat } });
        onChange({ target: { name: 'longitude', value: lng } });
    };

    return (
        <div className="space-y-4">
            <div>
                <Label className="mb-2 block">Pilih Lokasi di Peta</Label>
                <MapContainer  center={[latitude, longitude]} zoom={13} scrollWheelZoom={true} className='h-72 w-full rounded-md shadow'>
                    <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <MapClickHandler setCoordinates={setCoordinates} />
                    <Marker position={[latitude, longitude]} icon={markerIcon} />
                </MapContainer>
                <p className="mt-2 text-sm text-muted-foreground">Klik pada peta untuk memilih titik koordinat.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputText
                    name="latitude"
                    label="Latitude"
                    type="text"
                    placeholder="Masukkan Latitude"
                    onChange={onChange}
                    value={values.latitude}
                    errors={errors}
                    pattern="^-?\d+(\.\d+)?$"
                    min={-90}
                    max={90}
                />
                <InputText
                    name="longitude"
                    label="Longitude"
                    type="text"
                    placeholder="Masukkan Longitude"
                    onChange={onChange}
                    value={values.longitude}
                    errors={errors}
                    pattern="^-?\d+(\.\d+)?$"
                    min={-180}
                    max={180}
                />
            </div>
        </div>
    );
};

export default InputPeta;
