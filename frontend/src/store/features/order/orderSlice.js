import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersCall, createOrderCall } from '../../../api/orders';
import {
  apiCallStartAction,
  apiCallSuccessAction,
  apiCallFailAction,
} from '../api-call/apiCallSlice';

export const getOrdersAction = createAsyncThunk(
  'order/getOrdersAction',
  async (params, { dispatch, rejectWithValue, getState }) => {
    try {
      const { user } = getState();

      dispatch(apiCallStartAction());

      const {
        data: { orders, totalCount },
      } = await getOrdersCall(params, user.token);

      dispatch(apiCallSuccessAction());

      return { orders, totalCount };
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

export const createOrderAction = createAsyncThunk(
  'order/createOrderAction',
  async (values, { dispatch, rejectWithValue, getState }) => {
    try {
      const { user } = getState();

      dispatch(apiCallStartAction());

      const { data } = await createOrderCall(values, user.token);

      dispatch(apiCallSuccessAction(`Order created`));

      return data.order;
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

const initialState = {
  orders: [],
  totalCount: 0,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getOrdersAction.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.totalCount = action.payload.totalCount;
    });
    builder.addCase(createOrderAction.fulfilled, (state, action) => {
      state.orders = [...state.orders, action.payload];
    });
  },
});

export default orderSlice.reducer;
