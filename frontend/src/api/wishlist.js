import axios from './axios';

export const getWishlistCall = (token) => {
  return axios.get('/wishlist', {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const addToWishlistCall = (productId, token) => {
  return axios.post(
    `/wishlist/${productId}`,
    {},
    { headers: { authorization: `Bearer ${token}` } }
  );
};
