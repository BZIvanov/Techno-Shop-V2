import axios from './axios';

export const getProductsCall = (params = {}) => {
  return axios.get('/products', { params });
};

export const getProductCall = (id) => {
  return axios.get(`/products/${id}`);
};

export const createProductCall = (data, token) => {
  return axios.post('/products', data, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const updateProductCall = (productId, data, token) => {
  return axios.put(`/products/${productId}`, data, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const deleteProductCall = (id, token) => {
  return axios.delete(`/products/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const rateProductCall = (id, rating, token) => {
  return axios.put(`/products/${id}/rate`, rating, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const getSimilarProductsCall = (productId) => {
  return axios.get(`/products/${productId}/similar`);
};
