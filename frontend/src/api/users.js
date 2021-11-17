import axios from './axios';

export const registerUserCall = (data) => {
  return axios.post('/user/register', data);
};

export const loginUserCall = (data) => {
  return axios.post('/user/login', data);
};

export const logoutUserCall = (token) => {
  return axios.put(
    '/user/logout',
    {},
    { headers: { authorization: `Bearer ${token}` } }
  );
};

export const getCurrentUserCall = (token) => {
  return axios.get('/user/current-user', {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const updatePasswordCall = (data, token) => {
  return axios.put('/user/update-password', data, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const forgotPasswordCall = (data) => {
  return axios.post('/user/forgot-password', data);
};

export const resetPasswordCall = (data) => {
  return axios.post('/user/reset-password', data);
};
