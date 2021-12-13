import { actionType } from '../action-types';

const initialState = {
  all: { products: [], totalCount: 0 },
  newest: { products: [], totalCount: 0 },
  bestselling: { products: [], totalCount: 0 },
  selectedProduct: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_ALL_PRODUCTS:
      return {
        ...state,
        all: {
          totalCount: action.payload.totalCount,
          products: action.payload.products,
        },
      };
    case actionType.GET_NEWEST_PRODUCTS:
      return {
        ...state,
        newest: {
          totalCount: action.payload.totalCount,
          products: action.payload.products,
        },
      };
    case actionType.GET_BESTSELLING_PRODUCTS:
      return {
        ...state,
        bestselling: {
          totalCount: action.payload.totalCount,
          products: action.payload.products,
        },
      };
    case actionType.GET_PRODUCT:
      return { ...state, selectedProduct: action.payload };
    case actionType.CREATE_PRODUCT:
      return {
        ...state,
        all: {
          products: [...state.all.products, action.payload],
          totalCount: state.all.totalCount + 1,
        },
      };
    case actionType.UPDATE_PRODUCT:
      const untouchedProducts = state.all.products.filter(
        (product) => product._id !== action.payload._id
      );
      return {
        ...state,
        all: {
          ...state.all,
          products: [...untouchedProducts, action.payload],
        },
      };
    case actionType.DELETE_PRODUCT:
      const filteredProducts = state.all.products.filter(
        (product) => product._id !== action.payload
      );
      return {
        ...state,
        all: {
          products: filteredProducts,
          totalCount: state.all.totalCount - 1,
        },
      };
    default:
      return state;
  }
};
