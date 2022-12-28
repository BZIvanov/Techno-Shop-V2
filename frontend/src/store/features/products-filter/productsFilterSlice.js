import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  text: '',
  price: [0, 4999],
  categories: [],
  rating: null,
};

const productsFilterSlice = createSlice({
  name: 'productsFilter',
  initialState,
  reducers: {
    filterAction: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { filterAction } = productsFilterSlice.actions;

export default productsFilterSlice.reducer;
