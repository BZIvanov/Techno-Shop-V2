import {
  getProductsCall,
  getProductCall,
  createProductCall,
  updateProductCall,
  deleteProductCall,
  rateProductCall,
  getSimilarProductsCall,
} from '../../api/products';
import {
  apiCallStartAction,
  apiCallSuccessAction,
  apiCallFailAction,
} from '../features/api-call/apiCallSlice';
import { actionType } from '../action-types';
import imageResizer from '../../utils/image-resizer';
import { PRODUCTS_LIST_TYPES } from '../../constants';

export const getProductsType = (data, productsType) => {
  let type = actionType.GET_ALL_PRODUCTS;
  if (productsType === PRODUCTS_LIST_TYPES.newest) {
    type = actionType.GET_NEWEST_PRODUCTS;
  } else if (productsType === PRODUCTS_LIST_TYPES.bestselling) {
    type = actionType.GET_BESTSELLING_PRODUCTS;
  }

  return {
    type,
    payload: data,
  };
};

export const getProductType = (product) => ({
  type: actionType.GET_PRODUCT,
  payload: product,
});

export const getSimilarProductsType = (products) => ({
  type: actionType.GET_SIMILAR_PRODUCTS,
  payload: products,
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

export const getProductsAction = ({ productsType, ...rest }) => {
  return async (dispatch) => {
    dispatch(apiCallStartAction());

    try {
      const { data } = await getProductsCall(rest);

      dispatch(apiCallSuccessAction());
      dispatch(getProductsType(data, productsType));
    } catch (error) {
      dispatch(apiCallFailAction('Get products error'));
    }
  };
};

export const getProductAction = (id) => {
  return async (dispatch) => {
    dispatch(apiCallStartAction());

    try {
      const { data } = await getProductCall(id);

      dispatch(apiCallSuccessAction());
      dispatch(getProductType(data.product));
    } catch (error) {
      dispatch(apiCallFailAction('Get product error'));
    }
  };
};

export const createProductAction = (product, token) => {
  return async (dispatch) => {
    dispatch(apiCallStartAction());

    try {
      const base64Images = await Promise.all(
        product.images.map((imageData) => imageResizer(imageData))
      );

      const { data } = await createProductCall(
        { ...product, images: base64Images },
        token
      );

      dispatch(apiCallSuccessAction(`Product '${data.product.title}' created`));
      dispatch(createProductType(data.product));
    } catch (error) {
      dispatch(apiCallFailAction('Create product error'));
    }
  };
};

export const updateProductAction = (product, token) => {
  return async (dispatch) => {
    dispatch(apiCallStartAction());

    try {
      const { data } = await updateProductCall(product, token);

      dispatch(apiCallSuccessAction(`Product '${data.product.name}' updated`));
      dispatch(updateProductType(data.product));
    } catch (error) {
      dispatch(apiCallFailAction('Update product error'));
    }
  };
};

export const deleteProductAction = (productId, token) => {
  return async (dispatch) => {
    dispatch(apiCallStartAction());

    try {
      await deleteProductCall(productId, token);

      dispatch(apiCallSuccessAction('Product deleted'));
      dispatch(deleteProductType(productId));
    } catch (error) {
      dispatch(apiCallFailAction('Delete product error'));
    }
  };
};

export const rateProductAction = (productId, rating, token) => {
  return async (dispatch) => {
    dispatch(apiCallStartAction());

    try {
      const { data } = await rateProductCall(productId, rating, token);

      dispatch(apiCallSuccessAction(`Product '${data.product.title}' rated`));
      dispatch(getProductType(data.product));
    } catch (error) {
      dispatch(apiCallFailAction('Rate product error'));
    }
  };
};

export const getSimilarProductsAction = (productId) => {
  return async (dispatch) => {
    dispatch(apiCallStartAction());

    try {
      const { data } = await getSimilarProductsCall(productId);

      dispatch(apiCallSuccessAction());
      dispatch(getSimilarProductsType(data.products));
    } catch (error) {
      dispatch(apiCallFailAction('Get similar products error'));
    }
  };
};
