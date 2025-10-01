import axios from 'axios';
import { auth } from '../utils/firebase';
import { API_BASE_URL } from '../utils/constants';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add Firebase ID token
api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error('Error getting Firebase token:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url
    });
    
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.error || error.response.data?.message || 'An error occurred';
      
      // If 401 Unauthorized, token might be expired
      if (error.response.status === 401) {
        const user = auth.currentUser;
        if (user) {
          try {
            console.log('🔄 Token expired, refreshing...');
            // Try to refresh token
            await user.getIdToken(true);
            // Retry the original request
            const config = error.config;
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
            console.log('✅ Token refreshed, retrying request...');
            return axios(config);
          } catch (refreshError) {
            console.error('❌ Token refresh failed:', refreshError);
          }
        }
      }
      
      throw new Error(message);
    } else if (error.request) {
      // Request made but no response
      console.error('❌ No response from server');
      throw new Error('No response from server. Please check your connection.');
    } else {
      // Error setting up request
      console.error('❌ Request setup error:', error.message);
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
);

export default api;


