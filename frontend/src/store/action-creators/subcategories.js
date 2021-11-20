import { getSubcategoriesCall } from '../../api/subcategories';
import { apiCallStartType, apiCallSuccessType, apiCallFailType } from './';
import { actionType } from '../action-types';

export const allSubcategoriesType = (subcategories) => ({
  type: actionType.GET_SUBCATEGORIES,
  payload: subcategories,
});

export const getSubcategoriesAction = () => {
  return async (dispatch) => {
    dispatch(apiCallStartType());

    try {
      const { data } = await getSubcategoriesCall();

      dispatch(apiCallSuccessType());
      dispatch(allSubcategoriesType(data.subcategories));
    } catch (error) {
      dispatch(apiCallFailType('Get subcategories error'));
    }
  };
};
