import axios from './axios';

export const registerUserCall = (userData) => {
  return axios.post('/users/register', userData);
};
