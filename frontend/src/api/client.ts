import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse } from '@/types';

// Runtime-safe base URL: prefer VITE_API_BASE_URL; otherwise, if running on Railway domain, use the known backend domain; else fallback to localhost
const deriveApiBaseUrl = (): string => {
  const envUrl = (import.meta as any)?.env?.VITE_API_BASE_URL as string | undefined;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0) return envUrl;
  const host = typeof window !== 'undefined' ? window.location.hostname : '';
  if (host.endsWith('.railway.app')) {
    // Hardcoded backend domain provided by user
    return 'https://weather-production-5d39.up.railway.app/api';
  }
  return 'http://localhost:5000/api';
};

const API_BASE_URL = deriveApiBaseUrl();

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse<ApiResponse<any>>) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Weather API methods
  async getWeatherData(locationId: string) {
    const response = await this.client.get<ApiResponse<any>>(`/weather/current/${locationId}`);
    return response.data;
  }

  async getForecast(locationId: string, days: number = 5) {
    const response = await this.client.get<ApiResponse<any>>(`/weather/forecast/${locationId}?days=${days}`);
    return response.data;
  }

  async searchLocations(query: string, limit: number = 10) {
    const response = await this.client.get<ApiResponse<any>>(`/locations/search?q=${query}&limit=${limit}`);
    return response.data;
  }

  async getLocationByCoords(lat: number, lng: number) {
    const response = await this.client.get<ApiResponse<any>>(`/locations/coordinates/${lat}/${lng}`);
    return response.data;
  }

  // The following endpoints are not implemented on the backend yet and may 404 if called.
  // Keeping placeholders if components reference them; consider implementing or removing usages.
  async getRecentSearches() { throw new Error('Not implemented on backend'); }
  async addRecentSearch(_locationId: string) { throw new Error('Not implemented on backend'); }
  async getWeatherStats() { throw new Error('Not implemented on backend'); }
  async getWeatherAlerts(_locationId: string) { throw new Error('Not implemented on backend'); }

  // User API methods
  async login(email: string, password: string) {
    const response = await this.client.post<ApiResponse<any>>('/auth/login', { email, password });
    return response.data;
  }

  async register(email: string, password: string, name: string) {
    const response = await this.client.post<ApiResponse<any>>('/auth/register', { email, password, name });
    return response.data;
  }

  async getCurrentUser() {
    const response = await this.client.get<ApiResponse<any>>('/user/profile');
    return response.data;
  }

  async updatePreferences(preferences: any) {
    const response = await this.client.put<ApiResponse<any>>('/user/profile', preferences);
    return response.data;
  }

  // Map API methods
  async getMapBounds(_bounds: any) { throw new Error('Not implemented on backend'); }
  async getPopularLocations() { throw new Error('Not implemented on backend'); }
}

export const apiClient = new ApiClient();
export default apiClient;
