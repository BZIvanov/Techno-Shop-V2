import { actionType } from '../action-types';

const initialState = {
  products: [],
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case actionType.CREATE_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    default:
      return state;
  }
};
