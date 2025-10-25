import axios from 'axios';

// Use Vite env var VITE_API_BASE_URL to point to the backend when deployed.
// Example value in Vercel: https://jhakaas-backend.vercel.app
// If not set, fall back to a relative `/api` for local development (vite dev server proxy).
const base = import.meta.env.VITE_API_BASE_URL
  ? `${import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '')}/api`
  : '/api';

const API = axios.create({
  baseURL: base,
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
