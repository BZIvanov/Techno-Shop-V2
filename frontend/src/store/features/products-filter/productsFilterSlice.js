import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  text: '',
  price: [0, 4999],
};

const productsFilterSlice = createSlice({
  name: 'productsFilter',
  initialState,
  reducers: {
    filterAction: (state, action) => {
      const filterName = Object.keys(action.payload)[0];
      const filterValue = action.payload[filterName];
      state[filterName] = filterValue;
    },
  },
});

export const { filterAction } = productsFilterSlice.actions;

export default productsFilterSlice.reducer;
