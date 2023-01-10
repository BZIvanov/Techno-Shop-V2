import axios from './axios';

export const getCouponsCall = (params = {}, token) => {
  return axios.get('/coupons', {
    params,
    headers: { authorization: `Bearer ${token}` },
  });
};

export const createCouponCall = (data, token) => {
  return axios.post('/coupons', data, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const deleteCouponCall = (id, token) => {
  return axios.delete(`/coupons/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  });
};
