import { createProductCall } from '../../api/products';
import { apiCallStartType, apiCallSuccessType, apiCallFailType } from './';
import { actionType } from '../action-types';
import imageResizer from '../../utils/image-resizer';

export const createProductType = (product) => ({
  type: actionType.CREATE_PRODUCT,
  payload: product,
});

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
