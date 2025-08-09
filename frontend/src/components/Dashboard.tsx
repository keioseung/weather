import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Search, MapPin, Clock, TrendingUp } from 'lucide-react';
import { useWeatherStore } from '@/store/weatherStore';
import WeatherMap from './WeatherMap';
import WeatherPanel from './WeatherPanel';
import SearchBar from './SearchBar';
import RecentSearches from './RecentSearches';
import WeatherStats from './WeatherStats';

const Dashboard: React.FC = () => {
  const {
    currentLocation,
    currentWeather,
    currentForecast,
    mapView,
    setMapView,
  } = useWeatherStore();

  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for demonstration
  const mockWeatherData: any = {
    id: 'mock-1',
    locationId: 'mock-location',
    timestamp: new Date().toISOString(),
    temperature: 22,
    feelsLike: 24,
    humidity: 65,
    pressure: 1013,
    windSpeed: 12,
    windDirection: 180,
    visibility: 10,
    description: '맑음',
    icon: '☀️',
    condition: 'clear' as const,
  };

  const mockForecastData: any[] = [
    { id: 'mock-1', locationId: 'mock-location', date: '2025-01-20', day: '오늘', temperature: { min: 18, max: 25 }, description: '맑음', icon: '☀️', condition: 'clear' as const, humidity: 60, windSpeed: 10, precipitation: 0 },
    { id: 'mock-2', locationId: 'mock-location', date: '2025-01-21', day: '내일', temperature: { min: 16, max: 23 }, description: '구름 많음', icon: '⛅', condition: 'partly-cloudy' as const, humidity: 70, windSpeed: 15, precipitation: 20 },
    { id: 'mock-3', locationId: 'mock-location', date: '2025-01-22', day: '수요일', temperature: { min: 14, max: 20 }, description: '비', icon: '🌧️', condition: 'rainy' as const, humidity: 85, windSpeed: 20, precipitation: 80 },
    { id: 'mock-4', locationId: 'mock-location', date: '2025-01-23', day: '목요일', temperature: { min: 12, max: 18 }, description: '흐림', icon: '☁️', condition: 'cloudy' as const, humidity: 75, windSpeed: 12, precipitation: 30 },
    { id: 'mock-5', locationId: 'mock-location', date: '2025-01-24', day: '금요일', temperature: { min: 15, max: 22 }, description: '맑음', icon: '☀️', condition: 'clear' as const, humidity: 65, windSpeed: 8, precipitation: 0 },
  ];

  useEffect(() => {
    // No-op: remove fake loading to avoid infinite loading UX
  }, []);

  const handleLocationSelect = (location: any) => {
    // No-op placeholder; API integration can be added here
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search functionality
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gradient font-display mb-4">
          전세계 날씨를 한눈에
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          실시간 날씨 데이터와 인터랙티브 세계지도로 전 세계 어디든 클릭하여 
          정확한 날씨 정보를 확인하세요.
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <SearchBar onSearch={handleSearch} />
      </motion.div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="weather-card p-0 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary-600" />
                인터랙티브 세계지도
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                지도를 클릭하여 해당 지역의 날씨를 확인하세요
              </p>
            </div>
            <div className="h-[600px] relative">
              <WeatherMap
                center={mapView.center}
                zoom={mapView.zoom}
                onLocationSelect={handleLocationSelect}
              />
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Current Weather */}
          <WeatherPanel
            location={currentLocation}
            weather={currentWeather || mockWeatherData}
            forecast={currentForecast.length > 0 ? currentForecast : mockForecastData}
          />

          {/* Recent Searches */}
          <RecentSearches />

          {/* Weather Stats */}
          <WeatherStats />
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-16"
        id="features"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            강력한 기능들
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            WeatherPro는 최신 기술을 활용하여 정확하고 실시간인 날씨 정보를 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <MapPin className="w-8 h-8" />,
              title: '전세계 커버리지',
              description: '200개 이상의 국가와 지역의 실시간 날씨 데이터',
            },
            {
              icon: <Clock className="w-8 h-8" />,
              title: '실시간 업데이트',
              description: '1분마다 업데이트되는 최신 날씨 정보',
            },
            {
              icon: <TrendingUp className="w-8 h-8" />,
              title: '정확한 예보',
              description: 'AI 기반의 정확한 5일 날씨 예보',
            },
            {
              icon: <Search className="w-8 h-8" />,
              title: '스마트 검색',
              description: '도시명, 국가명으로 빠른 검색',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="weather-card text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                <div className="text-primary-600">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
