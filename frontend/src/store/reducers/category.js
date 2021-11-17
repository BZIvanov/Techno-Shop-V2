import { actionType } from '../action-types';

const initialState = {
  categories: [],
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_ALL_CATEGORIES:
      return { ...state, categories: action.payload };
    case actionType.CREATE_CATEGORY:
      return { ...state, categories: [...state.categories, action.payload] };
    default:
      return state;
  }
};
