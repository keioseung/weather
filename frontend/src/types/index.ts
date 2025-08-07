export interface Location {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  timezone: string;
}

export interface WeatherData {
  id: string;
  locationId: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  visibility: number;
  description: string;
  icon: string;
  condition: WeatherCondition;
  timestamp: string;
}

export interface ForecastData {
  id: string;
  locationId: string;
  date: string;
  day: string;
  temperature: {
    min: number;
    max: number;
  };
  description: string;
  icon: string;
  condition: WeatherCondition;
  humidity: number;
  windSpeed: number;
  precipitation: number;
}

export type WeatherCondition = 
  | 'clear'
  | 'cloudy'
  | 'partly-cloudy'
  | 'rainy'
  | 'snowy'
  | 'stormy'
  | 'foggy'
  | 'hazy';

export interface WeatherStats {
  totalLocations: number;
  activeUsers: number;
  dataPoints: number;
  lastUpdated: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  units: 'metric' | 'imperial';
  language: 'ko' | 'en';
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
  defaultLocation?: string;
}

export interface SearchResult {
  locations: Location[];
  total: number;
  hasMore: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface RecentSearch {
  id: string;
  locationId: string;
  locationName: string;
  country: string;
  timestamp: string;
}

export interface WeatherAlert {
  id: string;
  locationId: string;
  type: 'warning' | 'watch' | 'advisory';
  severity: 'low' | 'medium' | 'high' | 'extreme';
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  active: boolean;
}
