import {
  TOGGLE_CART_DROPDOWN,
  ADD_CART_PRODUCT,
  REMOVE_CART_PRODUCT,
  DELETE_CART_PRODUCT,
} from '../actions/types';
import { addProductToCart, removeProductFromCart } from '../utils';

const INITIAL_STATE = {
  hidden: true,
  products: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_CART_DROPDOWN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case ADD_CART_PRODUCT:
      return {
        ...state,
        products: addProductToCart(state.products, action.payload),
      };
    case REMOVE_CART_PRODUCT:
      return {
        ...state,
        products: removeProductFromCart(state.products, action.payload),
      };
    case DELETE_CART_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload.id
        ),
      };

    default:
      return state;
  }
};

export default reducer;
