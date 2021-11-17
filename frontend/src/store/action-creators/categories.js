import { getAllCategoriesCall, createCategoryCall } from '../../api/categories';
import { apiCallStartType, apiCallSuccessType, apiCallFailType } from './';
import { actionType } from '../action-types';

export const allCategoriesType = (categories) => ({
  type: actionType.GET_ALL_CATEGORIES,
  payload: categories,
});

export const createCategoryType = (category) => ({
  type: actionType.CREATE_CATEGORY,
  payload: category,
});

export const getAllCategoriesAction = () => {
  return async (dispatch) => {
    dispatch(apiCallStartType());

    try {
      const { data } = await getAllCategoriesCall();

      dispatch(apiCallSuccessType());
      dispatch(allCategoriesType(data.categories));
    } catch (error) {
      dispatch(apiCallFailType('Get all categories error'));
    }
  };
};

export const createCategoryAction = (category, token) => {
  return async (dispatch) => {
    dispatch(apiCallStartType());

    try {
      const { data } = await createCategoryCall(category, token);

      dispatch(apiCallSuccessType(`Category '${data.category.name}' created`));
      dispatch(createCategoryType(data.category));
    } catch (error) {
      dispatch(apiCallFailType('Create category error'));
    }
  };
};
