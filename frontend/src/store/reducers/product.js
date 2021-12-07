import { actionType } from '../action-types';

const initialState = {
  products: [],
  product: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case actionType.GET_PRODUCT:
      return { ...state, product: action.payload };
    case actionType.CREATE_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    case actionType.UPDATE_PRODUCT:
      const untouchedProducts = state.products.filter(
        (product) => product._id !== action.payload._id
      );
      return { ...state, products: [...untouchedProducts, action.payload] };
    case actionType.DELETE_PRODUCT:
      const filteredProducts = state.products.filter(
        (product) => product._id !== action.payload
      );
      return { ...state, products: filteredProducts };
    default:
      return state;
  }
};
