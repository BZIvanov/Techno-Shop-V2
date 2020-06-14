import { TOGGLE_CART_DROPDOWN, ADD_PRODUCT } from '../actions/types';
import { addProductToCart } from '../utils';

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
    case ADD_PRODUCT:
      return {
        ...state,
        products: addProductToCart(state.products, action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
