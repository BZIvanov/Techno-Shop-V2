import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: {},
  drawerOpen: false,
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
      delete cartProducts[action.payload];
      state.cart = cartProducts;
    },
    clearCart: () => initialState,
    setDrawerOpen: (state, action) => {
      state.drawerOpen = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setDrawerOpen } =
  cartSlice.actions;

export default cartSlice.reducer;
