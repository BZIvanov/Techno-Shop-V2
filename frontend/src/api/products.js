import axios from './axios';

export const getProductsCall = (params = {}) => {
  return axios.get('/product', { params });
};

export const createProductCall = (data, token) => {
  return axios.post('/product', data, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const deleteProductCall = (id, token) => {
  return axios.delete(`/product/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  });
};
