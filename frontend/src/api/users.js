import axios from './axios';

export const registerUserCall = (userData) => {
  return axios.post('/users/register', userData);
};

export const loginUserCall = (userData) => {
  return axios.post('/users/login', userData);
};

export const logoutUserCall = (token) => {
  return axios.put(
    '/users/logout',
    {},
    { headers: { authorization: `Bearer ${token}` } }
  );
};

export const forgotPasswordCall = (data) => {
  return axios.post('/users/forgot-password', data);
};
