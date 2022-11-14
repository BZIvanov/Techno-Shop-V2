import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  success: '',
  error: '',
};

const apiCallSlice = createSlice({
  name: 'apiCall',
  initialState,
  reducers: {
    apiCallResetAction: (state) => {
      state.loading = false;
      state.success = '';
      state.error = '';
    },
    apiCallStartAction: (state) => {
      state.loading = true;
      state.success = '';
      state.error = '';
    },
    apiCallSuccessAction: (state, action) => {
      state.loading = false;
      state.success = action.payload || '';
    },
    apiCallFailAction: (state, action) => {
      state.loading = false;
      state.error = action.payload || '';
    },
  },
});

export const {
  apiCallResetAction,
  apiCallStartAction,
  apiCallSuccessAction,
  apiCallFailAction,
} = apiCallSlice.actions;

export default apiCallSlice.reducer;
