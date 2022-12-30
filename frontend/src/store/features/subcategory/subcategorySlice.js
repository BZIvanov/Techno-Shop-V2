import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getSubcategoriesCall,
  getSubcategoryCall,
  createSubcategoryCall,
  updateSubcategoryCall,
  deleteSubcategoryCall,
  getSubcategoryProductsCall,
} from '../../../api/subcategories';
import {
  apiCallStartAction,
  apiCallSuccessAction,
  apiCallFailAction,
} from '../api-call/apiCallSlice';

export const getSubcategoriesAction = createAsyncThunk(
  'subcategory/getSubcategoriesAction',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(apiCallStartAction());

      const { data } = await getSubcategoriesCall();

      dispatch(apiCallSuccessAction());

      return data.subcategories;
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

export const getSubcategoryAction = createAsyncThunk(
  'subcategory/getSubcategoryAction',
  async (subcategoryId, { dispatch, rejectWithValue }) => {
    try {
      dispatch(apiCallStartAction());

      const { data } = await getSubcategoryCall(subcategoryId);

      dispatch(apiCallSuccessAction());

      return data.subcategory;
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

export const createSubcategoryAction = createAsyncThunk(
  'subcategory/createSubcategoryAction',
  async (values, { dispatch, rejectWithValue, getState }) => {
    try {
      const { user } = getState();
      dispatch(apiCallStartAction());

      const { data } = await createSubcategoryCall(values, user.token);

      dispatch(
        apiCallSuccessAction(`Subcategory '${data.subcategory.name}' created`)
      );

      return data.subcategory;
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

export const updateSubcategoryAction = createAsyncThunk(
  'subcategory/updateSubcategoryAction',
  async (values, { dispatch, rejectWithValue, getState }) => {
    try {
      const { user } = getState();
      dispatch(apiCallStartAction());

      const { data } = await updateSubcategoryCall(values, user.token);

      dispatch(
        apiCallSuccessAction(`Subcategory '${data.subcategory.name}' updated`)
      );

      return data.subcategory;
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

export const deleteSubcategoryAction = createAsyncThunk(
  'subcategory/deleteSubcategoryAction',
  async (subcategoryId, { dispatch, rejectWithValue, getState }) => {
    try {
      const { user } = getState();
      dispatch(apiCallStartAction());

      await deleteSubcategoryCall(subcategoryId, user.token);

      dispatch(apiCallSuccessAction('Subcategory deleted'));

      return subcategoryId;
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

export const getSubcategoryProductsAction = createAsyncThunk(
  'subcategory/getSubcategoryProductsAction',
  async (values, { dispatch, rejectWithValue }) => {
    try {
      const { subcategoryId, params } = values;
      dispatch(apiCallStartAction());

      const { data } = await getSubcategoryProductsCall(subcategoryId, params);

      dispatch(apiCallSuccessAction());

      return data;
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

const initialState = {
  subcategories: [],
  selectedSubcategory: null,
  selectedSubcategoryProducts: { products: [], totalCount: 0 },
};

const subcategorySlice = createSlice({
  name: 'subcategory',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getSubcategoriesAction.fulfilled, (state, action) => {
      state.subcategories = action.payload;
    });
    builder.addCase(getSubcategoryAction.fulfilled, (state, action) => {
      state.selectedSubcategory = action.payload;
    });
    builder.addCase(createSubcategoryAction.fulfilled, (state, action) => {
      state.subcategories = [...state.subcategories, action.payload];
    });
    builder.addCase(updateSubcategoryAction.fulfilled, (state, action) => {
      const untouchedSubcategories = state.subcategories.filter(
        (subcategory) => subcategory._id !== action.payload._id
      );
      state.subcategories = [...untouchedSubcategories, action.payload];
    });
    builder.addCase(deleteSubcategoryAction.fulfilled, (state, action) => {
      const filteredSubcategories = state.subcategories.filter(
        (subcategory) => subcategory._id !== action.payload
      );
      state.subcategories = filteredSubcategories;
    });
    builder.addCase(getSubcategoryProductsAction.fulfilled, (state, action) => {
      state.selectedSubcategoryProducts.products = action.payload.products;
      state.selectedSubcategoryProducts.totalCount = action.payload.totalCount;
    });
  },
});

export default subcategorySlice.reducer;
