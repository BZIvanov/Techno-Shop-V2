import { actionType } from '../action-types';

const initialState = {
  subcategories: [],
};

export const subcategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_SUBCATEGORIES:
      return { ...state, subcategories: action.payload };
    default:
      return state;
  }
};
