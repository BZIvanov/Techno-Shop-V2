import axios from './axios';

export const getSubcategoriesCall = () => {
  return axios.get('/subcategories');
};

export const getSubcategoryCall = (id) => {
  return axios.get(`/subcategories/${id}`);
};

export const createSubcategoryCall = (data, token) => {
  return axios.post('/subcategories', data, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const updateSubcategoryCall = (data, token) => {
  return axios.put(`/subcategories/${data._id}`, data, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const deleteSubcategoryCall = (id, token) => {
  return axios.delete(`/subcategories/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const getSubcategoryProductsCall = (id, params = {}) => {
  return axios.get(`/subcategories/${id}/products`, { params });
};
