import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
    const response = await this.client.get<ApiResponse<any>>(`/weather/${locationId}`);
    return response.data;
  }

  async getForecast(locationId: string, days: number = 5) {
    const response = await this.client.get<ApiResponse<any>>(`/forecast/${locationId}?days=${days}`);
    return response.data;
  }

  async searchLocations(query: string, limit: number = 10) {
    const response = await this.client.get<ApiResponse<any>>(`/locations/search?q=${query}&limit=${limit}`);
    return response.data;
  }

  async getLocationByCoords(lat: number, lng: number) {
    const response = await this.client.get<ApiResponse<any>>(`/locations/coords?lat=${lat}&lng=${lng}`);
    return response.data;
  }

  async getRecentSearches() {
    const response = await this.client.get<ApiResponse<any>>('/recent-searches');
    return response.data;
  }

  async addRecentSearch(locationId: string) {
    const response = await this.client.post<ApiResponse<any>>('/recent-searches', { locationId });
    return response.data;
  }

  async getWeatherStats() {
    const response = await this.client.get<ApiResponse<any>>('/stats');
    return response.data;
  }

  async getWeatherAlerts(locationId: string) {
    const response = await this.client.get<ApiResponse<any>>(`/alerts/${locationId}`);
    return response.data;
  }

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
    const response = await this.client.get<ApiResponse<any>>('/auth/me');
    return response.data;
  }

  async updatePreferences(preferences: any) {
    const response = await this.client.put<ApiResponse<any>>('/user/preferences', preferences);
    return response.data;
  }

  // Map API methods
  async getMapBounds(bounds: any) {
    const response = await this.client.post<ApiResponse<any>>('/map/bounds', bounds);
    return response.data;
  }

  async getPopularLocations() {
    const response = await this.client.get<ApiResponse<any>>('/locations/popular');
    return response.data;
  }
}

export const apiClient = new ApiClient();
export default apiClient;
