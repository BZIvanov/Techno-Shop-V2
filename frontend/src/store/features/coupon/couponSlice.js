import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCouponsCall, createCouponCall } from '../../../api/coupons';
import {
  apiCallStartAction,
  apiCallSuccessAction,
  apiCallFailAction,
} from '../api-call/apiCallSlice';

export const getCouponsAction = createAsyncThunk(
  'coupon/getCouponsAction',
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const { user } = getState();

      dispatch(apiCallStartAction());

      const { data } = await getCouponsCall(user.token);

      dispatch(apiCallSuccessAction());

      return data.coupons;
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

export const createCouponAction = createAsyncThunk(
  'coupon/createCouponAction',
  async (values, { dispatch, rejectWithValue, getState }) => {
    try {
      const { user } = getState();

      dispatch(apiCallStartAction());

      const { data } = await createCouponCall(values, user.token);

      dispatch(apiCallSuccessAction(`Coupon '${data.coupon.name}' created`));

      return data.coupon;
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

const initialState = {
  coupons: [],
};

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCouponsAction.fulfilled, (state, action) => {
      state.coupons = action.payload;
    });
    builder.addCase(createCouponAction.fulfilled, (state, action) => {
      state.coupons = [...state.coupons, action.payload];
    });
  },
});

export default couponSlice.reducer;
