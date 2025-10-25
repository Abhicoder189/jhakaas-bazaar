import API from './axios';

export const login = (email, password) => API.post('/users/login', { email, password });

export const register = (name, email, password) =>
  API.post('/users/register', { name, email, password });

export const getProfile = () => API.get('/users/profile');
