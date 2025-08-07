import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="loading-spinner"></div>
      <span className="ml-3 text-gray-600">로딩 중...</span>
    </div>
  );
};

export default LoadingSpinner;
