import {
  TOGGLE_CART_DROPDOWN,
  ADD_CART_PRODUCT,
  REMOVE_CART_PRODUCT,
  DELETE_CART_PRODUCT,
} from './types';

export const toggleCartView = () => ({
  type: TOGGLE_CART_DROPDOWN,
});

export const addCartProduct = (product) => ({
  type: ADD_CART_PRODUCT,
  payload: product,
});

export const removeCartProduct = (product) => ({
  type: REMOVE_CART_PRODUCT,
  payload: product,
});

export const deleteCartProduct = (product) => ({
  type: DELETE_CART_PRODUCT,
  payload: product,
});
