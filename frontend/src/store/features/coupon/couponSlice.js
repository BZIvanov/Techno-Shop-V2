import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCouponsCall,
  createCouponCall,
  deleteCouponCall,
} from '../../../api/coupons';
import {
  apiCallStartAction,
  apiCallSuccessAction,
  apiCallFailAction,
} from '../api-call/apiCallSlice';

export const getCouponsAction = createAsyncThunk(
  'coupon/getCouponsAction',
  async (params, { dispatch, rejectWithValue, getState }) => {
    try {
      const { user } = getState();

      dispatch(apiCallStartAction());

      const {
        data: { coupons, totalCount },
      } = await getCouponsCall(params, user.token);

      dispatch(apiCallSuccessAction());

      return { coupons, totalCount };
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

export const deleteCouponAction = createAsyncThunk(
  'coupon/deleteCouponAction',
  async (couponId, { dispatch, rejectWithValue, getState }) => {
    try {
      const { user } = getState();
      dispatch(apiCallStartAction());

      await deleteCouponCall(couponId, user.token);

      dispatch(apiCallSuccessAction('Coupon deleted'));

      return couponId;
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

const initialState = {
  coupons: [],
  totalCount: 0,
};

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCouponsAction.fulfilled, (state, action) => {
      state.coupons = action.payload.coupons;
      state.totalCount = action.payload.totalCount;
    });
    builder.addCase(createCouponAction.fulfilled, (state, action) => {
      state.coupons = [...state.coupons, action.payload];
    });
    builder.addCase(deleteCouponAction.fulfilled, (state, action) => {
      const filteredCoupons = state.coupons.filter(
        (coupon) => coupon._id !== action.payload
      );
      state.coupons = filteredCoupons;
    });
  },
});

export default couponSlice.reducer;
