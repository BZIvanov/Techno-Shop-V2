import {
  getAllCategoriesCall,
  getCategoryCall,
  createCategoryCall,
  updateCategoryCall,
  deleteCategoryCall,
  getCategorySubcategoriesCall,
  getCategoryProductsCall,
} from '../../api/categories';
import {
  apiCallStartAction,
  apiCallSuccessAction,
  apiCallFailAction,
} from '../features/api-call/apiCallSlice';
import { actionType } from '../action-types';

export const allCategoriesType = (categories) => ({
  type: actionType.GET_ALL_CATEGORIES,
  payload: categories,
});

export const getCategoryType = (category) => ({
  type: actionType.GET_CATEGORY,
  payload: category,
});

export const createCategoryType = (category) => ({
  type: actionType.CREATE_CATEGORY,
  payload: category,
});

export const updateCategoryType = (category) => ({
  type: actionType.UPDATE_CATEGORY,
  payload: category,
});

export const deleteCategoryType = (categoryId) => ({
  type: actionType.DELETE_CATEGORY,
  payload: categoryId,
});

export const getCategorySubcategoriesType = (subcategories) => ({
  type: actionType.GET_CATEGORY_SUBCATEGORIES,
  payload: subcategories,
});

export const getCategoryProductsType = (products) => ({
  type: actionType.GET_CATEGORY_PRODUCTS,
  payload: products,
});

export const getAllCategoriesAction = () => {
  return async (dispatch) => {
    dispatch(apiCallStartAction());

    try {
      const { data } = await getAllCategoriesCall();

      dispatch(apiCallSuccessAction());
      dispatch(allCategoriesType(data.categories));
    } catch (error) {
      dispatch(apiCallFailAction('Get all categories error'));
    }
  };
};

export const getCategoryAction = (categoryId) => {
  return async (dispatch) => {
    dispatch(apiCallStartAction());

    try {
      const { data } = await getCategoryCall(categoryId);

      dispatch(apiCallSuccessAction());
      dispatch(getCategoryType(data.category));
    } catch (error) {
      dispatch(apiCallFailAction('Get category error'));
    }
  };
};

export const createCategoryAction = (category, token) => {
  return async (dispatch) => {
    dispatch(apiCallStartAction());

    try {
      const { data } = await createCategoryCall(category, token);

      dispatch(
        apiCallSuccessAction(`Category '${data.category.name}' created`)
      );
      dispatch(createCategoryType(data.category));
    } catch (error) {
      dispatch(apiCallFailAction('Create category error'));
    }
  };
};

export const updateCategoryAction = (category, token) => {
  return async (dispatch) => {
    dispatch(apiCallStartAction());

    try {
      const { data } = await updateCategoryCall(category, token);

      dispatch(
        apiCallSuccessAction(`Category '${data.category.name}' updated`)
      );
      dispatch(updateCategoryType(data.category));
    } catch (error) {
      dispatch(apiCallFailAction('Update category error'));
    }
  };
};

export const deleteCategoryAction = (categoryId, token) => {
  return async (dispatch) => {
    dispatch(apiCallStartAction());

    try {
      await deleteCategoryCall(categoryId, token);

      dispatch(apiCallSuccessAction('Category deleted'));
      dispatch(deleteCategoryType(categoryId));
    } catch (error) {
      dispatch(apiCallFailAction('Delete category error'));
    }
  };
};

export const getCategorySubcategoriesAction = (categoryId) => {
  return async (dispatch) => {
    dispatch(apiCallStartAction());

    try {
      const { data } = await getCategorySubcategoriesCall(categoryId);

      dispatch(apiCallSuccessAction());
      dispatch(getCategorySubcategoriesType(data.subcategories));
    } catch (error) {
      dispatch(apiCallFailAction('Get category subcategories error'));
    }
  };
};

export const getCategoryProductsAction = (categoryId, params) => {
  return async (dispatch) => {
    dispatch(apiCallStartAction());

    try {
      const { data } = await getCategoryProductsCall(categoryId, params);

      dispatch(apiCallSuccessAction());
      dispatch(getCategoryProductsType(data));
    } catch (error) {
      dispatch(apiCallFailAction('Get category products error'));
    }
  };
};
