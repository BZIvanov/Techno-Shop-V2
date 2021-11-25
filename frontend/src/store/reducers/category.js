import { actionType } from '../action-types';

const initialState = {
  categories: [],
  selectedCategorySubcategories: [],
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_ALL_CATEGORIES:
      return { ...state, categories: action.payload };
    case actionType.CREATE_CATEGORY:
      return { ...state, categories: [...state.categories, action.payload] };
    case actionType.UPDATE_CATEGORY:
      const untouchedCategories = state.categories.filter(
        (category) => category._id !== action.payload._id
      );
      return { ...state, categories: [...untouchedCategories, action.payload] };
    case actionType.DELETE_CATEGORY:
      const filteredCategories = state.categories.filter(
        (category) => category._id !== action.payload
      );
      return { ...state, categories: filteredCategories };
    case actionType.GET_CATEGORY_SUBCATEGORIES:
      return { ...state, selectedCategorySubcategories: action.payload };
    default:
      return state;
  }
};
