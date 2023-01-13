import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrderCall } from '../../../api/orders';
import {
  apiCallStartAction,
  apiCallSuccessAction,
  apiCallFailAction,
} from '../api-call/apiCallSlice';

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
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createOrderAction.fulfilled, (state, action) => {
      state.orders = [...state.orders, action.payload];
    });
  },
});

export default orderSlice.reducer;
