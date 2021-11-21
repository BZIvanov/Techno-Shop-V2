import axios from './axios';

export const createProductCall = (data, token) => {
  return axios.post('/product', data, {
    headers: { authorization: `Bearer ${token}` },
  });
};
