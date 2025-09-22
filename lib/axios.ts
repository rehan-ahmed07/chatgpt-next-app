"use client";
import axios from 'axios';
import { getRouterInstance } from './router-instance';
import { useRouter } from 'next/navigation';

const axiosInstance = axios.create({
  baseURL: '/api/v1/',
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
      // Use the router instance for smooth navigation
      const router = useRouter();
      if (router) {
        router.push('/auth');
      } else {
        console.warn('Router instance not found, falling back to window.location');
        // window.location.href = '/auth';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;