import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, count } = action.payload;
      state.cart[product._id] = { product, count };
    },
    removeFromCart: (state, action) => {
      const cartProducts = Object.assign(state.cart, {});
      delete cartProducts[action.payload._id];
      state.cart = cartProducts;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
