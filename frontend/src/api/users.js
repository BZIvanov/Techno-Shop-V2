import axios from './axios';

export const registerUserCall = (data) => {
  return axios.post('/users/register', data);
};

export const loginUserCall = (data) => {
  return axios.post('/users/login', data);
};

export const logoutUserCall = (token) => {
  return axios.put(
    '/users/logout',
    {},
    { headers: { authorization: `Bearer ${token}` } }
  );
};

export const getCurrentUserCall = (token) => {
  return axios.get('/users/current-user', {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const forgotPasswordCall = (data) => {
  return axios.post('/users/forgot-password', data);
};

export const resetPasswordCall = (data) => {
  return axios.post('/users/reset-password', data);
};
