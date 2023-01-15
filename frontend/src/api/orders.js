import axios from './axios';

export const getOrdersCall = (params = {}, token) => {
  return axios.get('/orders', {
    params,
    headers: { authorization: `Bearer ${token}` },
  });
};

export const createOrderCall = (data, token) => {
  return axios.post('/orders', data, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const updateOrderStatusCall = (data, token) => {
  const { orderId, orderStatus } = data;

  return axios.put(
    `/orders/${orderId}`,
    { orderStatus },
    { headers: { authorization: `Bearer ${token}` } }
  );
};
