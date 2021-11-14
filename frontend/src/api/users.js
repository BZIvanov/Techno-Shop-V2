import axios from './axios';

export const registerUserCall = (userData) => {
  return axios.post('/users/register', userData);
};

export const logoutUserCall = (token) => {
  return axios.put(
    '/users/logout',
    {},
    { headers: { authorization: `Bearer ${token}` } }
  );
};
