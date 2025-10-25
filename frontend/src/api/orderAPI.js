import API from './axios';

export const createOrder = (orderData) => API.post('/orders', orderData);

export const getMyOrders = () => API.get('/orders/myorders');

export const getOrderById = (id) => API.get(`/orders/${id}`);

export const getAllOrders = () => API.get('/orders');

export const updateOrderStatus = (id, status) => API.put(`/orders/${id}/status`, { status });

export const cancelOrder = (id, reason) => API.put(`/orders/${id}/cancel`, { reason });
