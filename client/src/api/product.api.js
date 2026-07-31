// src/api/product.api.js
import API from './axios';

export const getProducts = async (category) => {
  const query = category && category !== 'All' ? `?category=${category}` : '';
  const response = await API.get(`/products${query}`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await API.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  // Use FormData if uploading images!
  const response = await API.post('/products', productData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};