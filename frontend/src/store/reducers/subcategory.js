import { actionType } from '../action-types';

const initialState = {
  subcategories: [],
};

export const subcategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_SUBCATEGORIES:
      return { ...state, subcategories: action.payload };
    case actionType.CREATE_SUBCATEGORY:
      return {
        ...state,
        subcategories: [...state.subcategories, action.payload],
      };
    case actionType.UPDATE_SUBCATEGORY:
      const untouchedSubcategories = state.subcategories.filter(
        (subcategory) => subcategory._id !== action.payload._id
      );
      return {
        ...state,
        subcategories: [...untouchedSubcategories, action.payload],
      };
    case actionType.DELETE_SUBCATEGORY:
      const filteredSubcategories = state.subcategories.filter(
        (subcategory) => subcategory._id !== action.payload
      );
      return { ...state, subcategories: filteredSubcategories };
    default:
      return state;
  }
};
