import axios from './axios';

export const getProductsCall = (params = {}) => {
  return axios.get('/product', { params });
};

export const getProductCall = (id) => {
  return axios.get(`/product/${id}`);
};

export const createProductCall = (data, token) => {
  return axios.post('/product', data, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const updateProductCall = (data, token) => {
  return axios.put(`/product/${data._id}`, data, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const deleteProductCall = (id, token) => {
  return axios.delete(`/product/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const rateProductCall = (id, rating, token) => {
  return axios.put(`/product/${id}/rate`, rating, {
    headers: { authorization: `Bearer ${token}` },
  });
};
