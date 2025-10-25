import API from './axios';

export const fetchProducts = (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  return API.get(`/products?${params}`);
};

export const fetchProductById = (id) => API.get(`/products/${id}`);

export const createProduct = (productData) => API.post('/products', productData);

export const updateProduct = (id, productData) => API.put(`/products/${id}`, productData);

export const deleteProduct = (id) => API.delete(`/products/${id}`);
