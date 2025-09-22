"use client";
import axios from 'axios';

const axiosInstance = axios.create({
  // Use same-origin proxy to avoid CORS in the browser
  baseURL: '/api/proxy',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for authentication
axiosInstance.interceptors.request.use(
  (config) => {
    // Cookies will be automatically sent with requests
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for handling auth errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Can't call hooks here; redirect via window.location as a fallback
      if (typeof window !== 'undefined') {
        window.location.href = '/auth';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;