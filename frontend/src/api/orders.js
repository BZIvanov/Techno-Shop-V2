import axios from './axios';

export const createOrderCall = (data, token) => {
  return axios.post('/orders', data, {
    headers: { authorization: `Bearer ${token}` },
  });
};
