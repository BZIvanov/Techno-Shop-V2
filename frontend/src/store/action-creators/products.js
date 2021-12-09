import {
  getProductsCall,
  getProductCall,
  createProductCall,
  updateProductCall,
  deleteProductCall,
} from '../../api/products';
import { apiCallStartType, apiCallSuccessType, apiCallFailType } from './';
import { actionType } from '../action-types';
import imageResizer from '../../utils/image-resizer';

export const getProductsType = (products) => {
  return {
    type: actionType.GET_ALL_PRODUCTS,
    payload: products,
  };
};

export const getProductType = (product) => ({
  type: actionType.GET_PRODUCT,
  payload: product,
});

export const createProductType = (product) => ({
  type: actionType.CREATE_PRODUCT,
  payload: product,
});

export const updateProductType = (product) => ({
  type: actionType.UPDATE_PRODUCT,
  payload: product,
});

export const deleteProductType = (productId) => ({
  type: actionType.DELETE_PRODUCT,
  payload: productId,
});

export const getProductsAction = (params) => {
  return async (dispatch) => {
    dispatch(apiCallStartType());

    try {
      const { data } = await getProductsCall(params);

      dispatch(apiCallSuccessType());
      dispatch(getProductsType(data.products));
    } catch (error) {
      dispatch(apiCallFailType('Get products error'));
    }
  };
};

export const getProductAction = (id) => {
  return async (dispatch) => {
    dispatch(apiCallStartType());

    try {
      const { data } = await getProductCall(id);

      dispatch(apiCallSuccessType());
      dispatch(getProductType(data.product));
    } catch (error) {
      dispatch(apiCallFailType('Get product error'));
    }
  };
};

export const createProductAction = (product, token) => {
  return async (dispatch) => {
    dispatch(apiCallStartType());

    try {
      const base64Images = await Promise.all(
        product.images.map((imageData) => imageResizer(imageData))
      );

      const { data } = await createProductCall(
        { ...product, images: base64Images },
        token
      );

      dispatch(apiCallSuccessType(`Product '${data.product.title}' created`));
      dispatch(createProductType(data.product));
    } catch (error) {
      dispatch(apiCallFailType('Create product error'));
    }
  };
};

export const updateProductAction = (product, token) => {
  return async (dispatch) => {
    dispatch(apiCallStartType());

    try {
      const { data } = await updateProductCall(product, token);

      dispatch(apiCallSuccessType(`Product '${data.product.name}' updated`));
      dispatch(updateProductType(data.product));
    } catch (error) {
      dispatch(apiCallFailType('Update product error'));
    }
  };
};

export const deleteProductAction = (productId, token) => {
  return async (dispatch) => {
    dispatch(apiCallStartType());

    try {
      await deleteProductCall(productId, token);

      dispatch(apiCallSuccessType('Product deleted'));
      dispatch(deleteProductType(productId));
    } catch (error) {
      dispatch(apiCallFailType('Delete product error'));
    }
  };
};
