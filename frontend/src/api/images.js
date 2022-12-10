import axios from './axios';

export const uploadImageCall = (data, token) => {
  return axios.post('/images/upload', data, {
    headers: { authorization: `Bearer ${token}` },
  });
};
