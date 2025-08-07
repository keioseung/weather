import React from 'react';
import { motion } from 'framer-motion';
import { History, MapPin } from 'lucide-react';
import { useWeatherStore } from '@/store/weatherStore';

const RecentSearches: React.FC = () => {
  const { recentSearches } = useWeatherStore();

  if (recentSearches.length === 0) {
    return (
      <div className="weather-card text-center">
        <History className="w-8 h-8 text-gray-400 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          최근 검색
        </h3>
        <p className="text-gray-600 text-sm">
          검색 기록이 없습니다
        </p>
      </div>
    );
  }

  return (
    <div className="weather-card">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <History className="w-5 h-5 mr-2 text-primary-600" />
        최근 검색
      </h3>
      <div className="space-y-2">
        {recentSearches.slice(0, 5).map((search, index) => (
          <motion.div
            key={search.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-primary-600" />
              <div>
                <div className="font-medium text-gray-800">{search.locationName}</div>
                <div className="text-sm text-gray-600">{search.country}</div>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              {new Date(search.timestamp).toLocaleDateString()}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
