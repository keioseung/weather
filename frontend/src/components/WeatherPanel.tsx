import React from 'react';
import { motion } from 'framer-motion';
import { Location, WeatherData, ForecastData } from '@/types';
import { Clock, MapPin, Droplets, Wind, Eye, Gauge } from 'lucide-react';

interface WeatherPanelProps {
  location: Location | null;
  weather: WeatherData;
  forecast: ForecastData[];
}

const WeatherPanel: React.FC<WeatherPanelProps> = ({ location, weather, forecast }) => {
  if (!location) {
    return (
      <div className="weather-card text-center">
        <div className="text-6xl mb-4">🌍</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          위치를 선택하세요
        </h3>
        <p className="text-gray-600 text-sm">
          지도를 클릭하거나 도시를 검색하여 날씨를 확인하세요
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Weather */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="weather-card"
      >
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-2">
            <MapPin className="w-4 h-4 text-primary-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">
              {location.name}, {location.country}
            </h2>
          </div>
          <div className="text-6xl mb-4">{weather.icon}</div>
          <div className="text-4xl font-bold text-gray-800 mb-2">
            {weather.temperature}°C
          </div>
          <p className="text-gray-600">{weather.description}</p>
        </div>

        {/* Weather Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="stat-card">
            <Droplets className="w-5 h-5 text-blue-500 mx-auto mb-2" />
            <div className="text-sm text-gray-600">습도</div>
            <div className="text-lg font-semibold">{weather.humidity}%</div>
          </div>
          <div className="stat-card">
            <Wind className="w-5 h-5 text-green-500 mx-auto mb-2" />
            <div className="text-sm text-gray-600">풍속</div>
            <div className="text-lg font-semibold">{weather.windSpeed} m/s</div>
          </div>
          <div className="stat-card">
            <Eye className="w-5 h-5 text-purple-500 mx-auto mb-2" />
            <div className="text-sm text-gray-600">가시거리</div>
            <div className="text-lg font-semibold">{weather.visibility} km</div>
          </div>
          <div className="stat-card">
            <Gauge className="w-5 h-5 text-orange-500 mx-auto mb-2" />
            <div className="text-sm text-gray-600">기압</div>
            <div className="text-lg font-semibold">{weather.pressure} hPa</div>
          </div>
        </div>
      </motion.div>

      {/* Forecast */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="weather-card"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-primary-600" />
          5일 예보
        </h3>
        <div className="space-y-3">
          {forecast.map((day, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{day.icon}</div>
                <div>
                  <div className="font-medium text-gray-800">{day.day}</div>
                  <div className="text-sm text-gray-600">{day.description}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-800">
                  {day.temperature.max}°C
                </div>
                <div className="text-sm text-gray-600">
                  {day.temperature.min}°C
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default WeatherPanel;
