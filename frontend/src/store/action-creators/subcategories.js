import {
  getSubcategoriesCall,
  getSubcategoryCall,
  createSubcategoryCall,
  updateSubcategoryCall,
  deleteSubcategoryCall,
  getSubcategoryProductsCall,
} from '../../api/subcategories';
import {
  apiCallStartAction,
  apiCallSuccessAction,
  apiCallFailAction,
} from '../features/api-call/apiCallSlice';
import { actionType } from '../action-types';

export const allSubcategoriesType = (subcategories) => ({
  type: actionType.GET_SUBCATEGORIES,
  payload: subcategories,
});

export const getSubcategoryType = (subcategory) => ({
  type: actionType.GET_SUBCATEGORY,
  payload: subcategory,
});

export const createSubcategoryType = (subcategory) => ({
  type: actionType.CREATE_SUBCATEGORY,
  payload: subcategory,
});

export const updateSubcategoryType = (subcategory) => ({
  type: actionType.UPDATE_SUBCATEGORY,
  payload: subcategory,
});

export const deleteSubcategoryType = (subcategoryId) => ({
  type: actionType.DELETE_SUBCATEGORY,
  payload: subcategoryId,
});

export const getSubcategoryProductsType = (products) => ({
  type: actionType.GET_SUBCATEGORY_PRODUCTS,
  payload: products,
});

export const getSubcategoriesAction = () => {
  return async (dispatch) => {
    dispatch(apiCallStartAction());

    try {
      const { data } = await getSubcategoriesCall();

      dispatch(apiCallSuccessAction());
      dispatch(allSubcategoriesType(data.subcategories));
    } catch (error) {
      dispatch(apiCallFailAction('Get subcategories error'));
    }
  };
};

export const getSubcategoryAction = (subcategoryId) => {
  return async (dispatch) => {
    dispatch(apiCallStartAction());

    try {
      const { data } = await getSubcategoryCall(subcategoryId);

      dispatch(apiCallSuccessAction());
      dispatch(getSubcategoryType(data.subcategory));
    } catch (error) {
      dispatch(apiCallFailAction('Get subcategory error'));
    }
  };
};

export const createSubcategoryAction = (subcategory, token) => {
  return async (dispatch) => {
    dispatch(apiCallStartAction());

    try {
      const { data } = await createSubcategoryCall(subcategory, token);

      dispatch(
        apiCallSuccessAction(`Subcategory '${data.subcategory.name}' created`)
      );
      dispatch(createSubcategoryType(data.subcategory));
    } catch (error) {
      dispatch(apiCallFailAction('Create subcategory error'));
    }
  };
};

export const updateSubcategoryAction = (subcategory, token) => {
  return async (dispatch) => {
    dispatch(apiCallStartAction());

    try {
      const { data } = await updateSubcategoryCall(subcategory, token);

      dispatch(
        apiCallSuccessAction(`Subcategory '${data.subcategory.name}' updated`)
      );
      dispatch(updateSubcategoryType(data.subcategory));
    } catch (error) {
      dispatch(apiCallFailAction('Update subcategory error'));
    }
  };
};

export const deleteSubcategoryAction = (subcategoryId, token) => {
  return async (dispatch) => {
    dispatch(apiCallStartAction());

    try {
      await deleteSubcategoryCall(subcategoryId, token);

      dispatch(apiCallSuccessAction('Subcategory deleted'));
      dispatch(deleteSubcategoryType(subcategoryId));
    } catch (error) {
      dispatch(apiCallFailAction('Delete subcategory error'));
    }
  };
};

export const getSubcategoryProductsAction = (subcategoryId, params) => {
  return async (dispatch) => {
    dispatch(apiCallStartAction());

    try {
      const { data } = await getSubcategoryProductsCall(subcategoryId, params);

      dispatch(apiCallSuccessAction());
      dispatch(getSubcategoryProductsType(data));
    } catch (error) {
      dispatch(apiCallFailAction('Get subcategory products error'));
    }
  };
};
