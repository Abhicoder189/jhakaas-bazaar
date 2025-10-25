import axios from 'axios';

// Use VITE_API_BASE_URL for deployed backend
// Falls back to /api for local development with proxy
const baseURL = import.meta.env.VITE_API_BASE_URL 
  ? `${import.meta.env.VITE_API_BASE_URL}/api`
  : '/api';

const API = axios.create({
  baseURL,
});

// Add token to requests if available
API.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
