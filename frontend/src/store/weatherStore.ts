import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Location, WeatherData, ForecastData, RecentSearch, UserPreferences } from '@/types';

interface WeatherState {
  // Current location and weather
  currentLocation: Location | null;
  currentWeather: WeatherData | null;
  currentForecast: ForecastData[];
  
  // Recent searches
  recentSearches: RecentSearch[];
  
  // User preferences
  preferences: UserPreferences;
  
  // UI state
  isLoading: boolean;
  error: string | null;
  mapView: {
    center: [number, number];
    zoom: number;
  };
  
  // Actions
  setCurrentLocation: (location: Location) => void;
  setCurrentWeather: (weather: WeatherData) => void;
  setCurrentForecast: (forecast: ForecastData[]) => void;
  addRecentSearch: (search: RecentSearch) => void;
  clearRecentSearches: () => void;
  setPreferences: (preferences: Partial<UserPreferences>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setMapView: (center: [number, number], zoom: number) => void;
  resetState: () => void;
}

const defaultPreferences: UserPreferences = {
  units: 'metric',
  language: 'ko',
  theme: 'auto',
  notifications: true,
};

const defaultMapView = {
  center: [37.5665, 126.9780] as [number, number], // Seoul
  zoom: 2,
};

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentLocation: null,
      currentWeather: null,
      currentForecast: [],
      recentSearches: [],
      preferences: defaultPreferences,
      isLoading: false,
      error: null,
      mapView: defaultMapView,

      // Actions
      setCurrentLocation: (location) => set({ currentLocation: location }),
      
      setCurrentWeather: (weather) => set({ currentWeather: weather }),
      
      setCurrentForecast: (forecast) => set({ currentForecast: forecast }),
      
      addRecentSearch: (search) => {
        const { recentSearches } = get();
        const filtered = recentSearches.filter(s => s.locationId !== search.locationId);
        const updated = [search, ...filtered].slice(0, 10); // Keep only 10 most recent
        set({ recentSearches: updated });
      },
      
      clearRecentSearches: () => set({ recentSearches: [] }),
      
      setPreferences: (newPreferences) => {
        const { preferences } = get();
        set({ preferences: { ...preferences, ...newPreferences } });
      },
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      setError: (error) => set({ error }),
      
      setMapView: (center, zoom) => set({ mapView: { center, zoom } }),
      
      resetState: () => set({
        currentLocation: null,
        currentWeather: null,
        currentForecast: [],
        isLoading: false,
        error: null,
        mapView: defaultMapView,
      }),
    }),
    {
      name: 'weather-store',
      partialize: (state) => ({
        recentSearches: state.recentSearches,
        preferences: state.preferences,
        mapView: state.mapView,
      }),
    }
  )
);
