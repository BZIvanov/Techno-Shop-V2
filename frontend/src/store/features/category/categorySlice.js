import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllCategoriesCall,
  getCategoryCall,
  createCategoryCall,
  updateCategoryCall,
  deleteCategoryCall,
  getCategorySubcategoriesCall,
  getCategoryProductsCall,
} from '../../../api/categories';
import {
  apiCallStartAction,
  apiCallSuccessAction,
  apiCallFailAction,
} from '../api-call/apiCallSlice';

const initialState = {
  categories: [],
  selectedCategory: null,
  selectedCategorySubcategories: [],
  selectedCategoryProducts: { products: [], totalCount: 0 },
};

export const getAllCategoriesAction = createAsyncThunk(
  'category/getAllCategories',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(apiCallStartAction());

      const { data } = await getAllCategoriesCall();

      dispatch(apiCallSuccessAction());

      return data.categories;
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

export const getCategoryAction = createAsyncThunk(
  'category/getCategory',
  async (categoryId, { dispatch, rejectWithValue }) => {
    try {
      dispatch(apiCallStartAction());

      const { data } = await getCategoryCall(categoryId);

      dispatch(apiCallSuccessAction());

      return data.category;
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

export const createCategoryAction = createAsyncThunk(
  'category/createCategoryAction',
  async (values, { dispatch, rejectWithValue, getState }) => {
    try {
      const { user } = getState();
      dispatch(apiCallStartAction());

      const { data } = await createCategoryCall(values, user.token);

      dispatch(
        apiCallSuccessAction(`Category '${data.category.name}' created`)
      );

      return data.category;
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

export const updateCategoryAction = createAsyncThunk(
  'category/updateCategoryAction',
  async (values, { dispatch, rejectWithValue, getState }) => {
    try {
      const { user } = getState();
      dispatch(apiCallStartAction());

      const { data } = await updateCategoryCall(values, user.token);

      dispatch(
        apiCallSuccessAction(`Category '${data.category.name}' updated`)
      );

      return data.category;
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

export const deleteCategoryAction = createAsyncThunk(
  'category/deleteCategoryAction',
  async (categoryId, { dispatch, rejectWithValue, getState }) => {
    try {
      const { user } = getState();
      dispatch(apiCallStartAction());

      await deleteCategoryCall(categoryId, user.token);

      dispatch(apiCallSuccessAction('Category deleted'));

      return categoryId;
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

export const getCategorySubcategoriesAction = createAsyncThunk(
  'category/getCategorySubcategoriesAction',
  async (categoryId, { dispatch, rejectWithValue }) => {
    try {
      dispatch(apiCallStartAction());

      const { data } = await getCategorySubcategoriesCall(categoryId);

      dispatch(apiCallSuccessAction());

      return data.subcategories;
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

export const getCategoryProductsAction = createAsyncThunk(
  'category/getCategoryProductsAction',
  async (values, { dispatch, rejectWithValue }) => {
    try {
      const { categoryId, params } = values;
      dispatch(apiCallStartAction());

      const { data } = await getCategoryProductsCall(categoryId, params);

      dispatch(apiCallSuccessAction());

      return data;
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllCategoriesAction.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(getCategoryAction.fulfilled, (state, action) => {
      state.selectedCategory = action.payload;
    });
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.categories = [...state.categories, action.payload];
    });
    builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
      const untouchedCategories = state.categories.filter(
        (category) => category._id !== action.payload._id
      );
      state.categories = [...untouchedCategories, action.payload];
    });
    builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
      const filteredCategories = state.categories.filter(
        (category) => category._id !== action.payload
      );
      state.categories = filteredCategories;
    });
    builder.addCase(
      getCategorySubcategoriesAction.fulfilled,
      (state, action) => {
        state.selectedCategorySubcategories = action.payload;
      }
    );
    builder.addCase(getCategoryProductsAction.fulfilled, (state, action) => {
      state.selectedCategoryProducts.products = action.payload.products;
      state.selectedCategoryProducts.totalCount = action.payload.totalCount;
    });
  },
});

export default categorySlice.reducer;
