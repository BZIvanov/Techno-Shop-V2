import axios from './axios';

export const getWishlistCall = (token) => {
  return axios.get('/wishlists', {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const addToWishlistCall = (productId, token) => {
  return axios.post(
    `/wishlists/${productId}`,
    {},
    { headers: { authorization: `Bearer ${token}` } }
  );
};
