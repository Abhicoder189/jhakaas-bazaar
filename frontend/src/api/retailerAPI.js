import API from './axios';

// Retailer registration
export const registerRetailer = (retailerData) => API.post('/retailers/register', retailerData);

// Get retailer profile
export const getRetailerProfile = () => API.get('/retailers/profile');

// Update retailer profile
export const updateRetailerProfile = (profileData) => API.put('/retailers/profile', profileData);

// Get retailer's products
export const getRetailerProducts = () => API.get('/retailers/products');

// Create product (retailer)
export const createRetailerProduct = (productData) => API.post('/retailers/products', productData);

// Update product (retailer)
export const updateRetailerProduct = (id, productData) => API.put(`/retailers/products/${id}`, productData);

// Delete product (retailer)
export const deleteRetailerProduct = (id) => API.delete(`/retailers/products/${id}`);

// Admin endpoints
export const getAllRetailers = () => API.get('/retailers');

export const verifyRetailer = (id, isVerified) => API.put(`/retailers/${id}/verify`, { isVerified });

export const getPendingProducts = () => API.get('/retailers/pending-products');

export const approveProduct = (id, approved) => API.put(`/retailers/products/${id}/approve`, { approved });
