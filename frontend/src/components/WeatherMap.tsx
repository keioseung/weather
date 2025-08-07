import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Icon, LatLng } from 'leaflet';
import { MapPin } from 'lucide-react';
import { Location } from '@/types';

interface WeatherMapProps {
  center: [number, number];
  zoom: number;
  onLocationSelect: (location: Location) => void;
}

// Custom marker icon
const createCustomIcon = (color: string = '#3b82f6') => {
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="${color}"/>
        <circle cx="12" cy="9" r="2.5" fill="white"/>
      </svg>
    `)}`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });
};

// Major cities data
const majorCities: Location[] = [
  { id: '1', name: 'Seoul', country: 'South Korea', lat: 37.5665, lng: 126.9780, timezone: 'Asia/Seoul' },
  { id: '2', name: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503, timezone: 'Asia/Tokyo' },
  { id: '3', name: 'Beijing', country: 'China', lat: 39.9042, lng: 116.4074, timezone: 'Asia/Shanghai' },
  { id: '4', name: 'New York', country: 'United States', lat: 40.7128, lng: -74.0060, timezone: 'America/New_York' },
  { id: '5', name: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278, timezone: 'Europe/London' },
  { id: '6', name: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522, timezone: 'Europe/Paris' },
  { id: '7', name: 'Berlin', country: 'Germany', lat: 52.5200, lng: 13.4050, timezone: 'Europe/Berlin' },
  { id: '8', name: 'Moscow', country: 'Russia', lat: 55.7558, lng: 37.6176, timezone: 'Europe/Moscow' },
  { id: '9', name: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093, timezone: 'Australia/Sydney' },
  { id: '10', name: 'Rio de Janeiro', country: 'Brazil', lat: -22.9068, lng: -43.1729, timezone: 'America/Sao_Paulo' },
];

// Map click handler component
const MapClickHandler: React.FC<{ onLocationSelect: (location: Location) => void }> = ({ onLocationSelect }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      const mockLocation: Location = {
        id: `clicked-${Date.now()}`,
        name: '선택된 위치',
        country: 'Unknown',
        lat,
        lng,
        timezone: 'UTC',
      };
      onLocationSelect(mockLocation);
    },
  });
  return null;
};

const WeatherMap: React.FC<WeatherMapProps> = ({ center, zoom, onLocationSelect }) => {
  const [mapLayers] = useState([
    {
      name: 'OpenStreetMap',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '© OpenStreetMap contributors',
    },
    {
      name: 'Satellite',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '© Esri',
    },
    {
      name: 'Terrain',
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: '© OpenTopoMap',
    },
  ]);

  const [currentLayer, setCurrentLayer] = useState(0);

  const handleMarkerClick = (location: Location) => {
    onLocationSelect(location);
  };

  return (
    <div className="relative h-full">
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full"
        zoomControl={true}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
        touchZoom={true}
      >
        <TileLayer
          url={mapLayers[currentLayer].url}
          attribution={mapLayers[currentLayer].attribution}
        />
        
        <MapClickHandler onLocationSelect={onLocationSelect} />

        {/* Major cities markers */}
        {majorCities.map((city) => (
          <Marker
            key={city.id}
            position={[city.lat, city.lng]}
            icon={createCustomIcon('#3b82f6')}
            eventHandlers={{
              click: () => handleMarkerClick(city),
            }}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-semibold text-gray-800">{city.name}</h3>
                <p className="text-sm text-gray-600">{city.country}</p>
                <div className="mt-2 text-2xl">🌤️</div>
                <p className="text-sm text-gray-500">클릭하여 날씨 확인</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map controls */}
      <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-lg p-2">
        <div className="flex flex-col space-y-2">
          {mapLayers.map((layer, index) => (
            <button
              key={layer.name}
              onClick={() => setCurrentLayer(index)}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                currentLayer === index
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {layer.name}
            </button>
          ))}
        </div>
      </div>

      {/* Map info */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-primary-600" />
          <span className="text-sm text-gray-700">
            지도를 클릭하여 날씨 확인
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeatherMap;
