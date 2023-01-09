import axios from './axios';

export const getCouponsCall = (token) => {
  return axios.get('/coupons', {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const createCouponCall = (data, token) => {
  return axios.post('/coupons', data, {
    headers: { authorization: `Bearer ${token}` },
  });
};
