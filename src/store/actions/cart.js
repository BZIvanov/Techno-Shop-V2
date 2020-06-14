import { TOGGLE_CART_DROPDOWN, ADD_PRODUCT } from './types';

export const toggleCartView = () => ({
  type: TOGGLE_CART_DROPDOWN,
});

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});
