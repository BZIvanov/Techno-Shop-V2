import axios from './axios';

export const getAllCategoriesCall = () => {
  return axios.get('/category');
};

export const createCategoryCall = (data, token) => {
  return axios.post('/category', data, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const deleteCategoryCall = (id, token) => {
  return axios.delete(`/category/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  });
};
