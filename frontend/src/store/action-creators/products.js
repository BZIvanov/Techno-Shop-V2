import { createProductCall } from '../../api/products';
import { apiCallStartType, apiCallSuccessType, apiCallFailType } from './';
import { actionType } from '../action-types';

export const createProductType = (product) => ({
  type: actionType.CREATE_PRODUCT,
  payload: product,
});

export const createProductAction = (product, token) => {
  return async (dispatch) => {
    dispatch(apiCallStartType());

    try {
      const { data } = await createProductCall(product, token);

      dispatch(apiCallSuccessType(`Product '${data.product.title}' created`));
      dispatch(createProductType(data.product));
    } catch (error) {
      dispatch(apiCallFailType('Create product error'));
    }
  };
};
