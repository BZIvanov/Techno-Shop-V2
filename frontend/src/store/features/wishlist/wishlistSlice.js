import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWishlistCall, addToWishlistCall } from '../../../api/wishlist';
import {
  apiCallStartAction,
  apiCallSuccessAction,
  apiCallFailAction,
} from '../api-call/apiCallSlice';

export const getWishlistAction = createAsyncThunk(
  'wishlist/getWishlistAction',
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const { user } = getState();

      dispatch(apiCallStartAction());

      const { data } = await getWishlistCall(user.token);

      dispatch(apiCallSuccessAction());

      return data.products;
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

export const addToWishlistAction = createAsyncThunk(
  'wishlist/addToWishlistAction',
  async (productId, { dispatch, rejectWithValue, getState }) => {
    try {
      const { user } = getState();

      dispatch(apiCallStartAction());

      const { data } = await addToWishlistCall(productId, user.token);

      dispatch(apiCallSuccessAction());

      return data.products;
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

const initialState = {
  products: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getWishlistAction.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(addToWishlistAction.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export default wishlistSlice.reducer;
