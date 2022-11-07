import axios from './axios';

export const getAllCategoriesCall = () => {
  return axios.get('/categories');
};

export const getCategoryCall = (id) => {
  return axios.get(`/categories/${id}`);
};

export const createCategoryCall = (data, token) => {
  return axios.post('/categories', data, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const updateCategoryCall = (data, token) => {
  return axios.put(`/categories/${data._id}`, data, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const deleteCategoryCall = (id, token) => {
  return axios.delete(`/categories/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const getCategorySubcategoriesCall = (id) => {
  return axios.get(`/categories/${id}/subcategories`);
};

export const getCategoryProductsCall = (id, params = {}) => {
  return axios.get(`/categories/${id}/products`, { params });
};
