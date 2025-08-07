import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Globe, Users, Database } from 'lucide-react';

const WeatherStats: React.FC = () => {
  const stats = [
    {
      icon: <Globe className="w-5 h-5" />,
      label: '커버 지역',
      value: '200+',
      color: 'text-blue-500',
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: '활성 사용자',
      value: '10K+',
      color: 'text-green-500',
    },
    {
      icon: <Database className="w-5 h-5" />,
      label: '데이터 포인트',
      value: '1M+',
      color: 'text-purple-500',
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: '정확도',
      value: '99.9%',
      color: 'text-orange-500',
    },
  ];

  return (
    <div className="weather-card">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
        실시간 통계
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-2 ${stat.color}`}>
              {stat.icon}
            </div>
            <div className="text-lg font-bold text-gray-800">{stat.value}</div>
            <div className="text-xs text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WeatherStats;
