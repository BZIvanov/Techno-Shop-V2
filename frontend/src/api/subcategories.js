import axios from './axios';

export const getSubcategoriesCall = () => {
  return axios.get('/subcategory');
};

export const getSubcategoryCall = (id) => {
  return axios.get(`/subcategory/${id}`);
};

export const createSubcategoryCall = (data, token) => {
  return axios.post('/subcategory', data, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const updateSubcategoryCall = (data, token) => {
  return axios.put(`/subcategory/${data._id}`, data, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const deleteSubcategoryCall = (id, token) => {
  return axios.delete(`/subcategory/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const getSubcategoryProductsCall = (id, params = {}) => {
  return axios.get(`/subcategory/${id}/products`, { params });
};
