import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getProductsCall,
  getProductCall,
  createProductCall,
  updateProductCall,
  deleteProductCall,
  rateProductCall,
  getSimilarProductsCall,
} from '../../../api/products';
import {
  apiCallStartAction,
  apiCallSuccessAction,
  apiCallFailAction,
} from '../api-call/apiCallSlice';
import imageResizer from '../../../utils/image-resizer';

export const getProductsAction = createAsyncThunk(
  'product/getProductsAction',
  async ({ productsType, ...rest }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(apiCallStartAction());

      const { data } = await getProductsCall(rest);

      dispatch(apiCallSuccessAction());

      return { productsType, ...data };
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

export const getProductAction = createAsyncThunk(
  'product/getProductAction',
  async (productId, { dispatch, rejectWithValue }) => {
    try {
      dispatch(apiCallStartAction());

      const { data } = await getProductCall(productId);

      dispatch(apiCallSuccessAction());

      return data.product;
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

export const createProductAction = createAsyncThunk(
  'product/createProductAction',
  async (values, { dispatch, rejectWithValue, getState }) => {
    try {
      const { user } = getState();

      dispatch(apiCallStartAction());

      const base64Images = await Promise.all(
        values.images.map((imageData) => imageResizer(imageData))
      );

      const { data } = await createProductCall(
        { ...values, images: base64Images },
        user.token
      );

      dispatch(apiCallSuccessAction(`Product '${data.product.title}' created`));

      return data.product;
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

export const updateProductAction = createAsyncThunk(
  'product/updateProductAction',
  async (values, { dispatch, rejectWithValue, getState }) => {
    try {
      const { user } = getState();

      dispatch(apiCallStartAction());

      const { data } = await updateProductCall(values, user.token);

      dispatch(apiCallSuccessAction(`Product '${data.product.name}' updated`));

      return data.product;
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

export const deleteProductAction = createAsyncThunk(
  'product/deleteProductAction',
  async (productId, { dispatch, rejectWithValue, getState }) => {
    try {
      const { user } = getState();

      dispatch(apiCallStartAction());

      await deleteProductCall(productId, user.token);

      dispatch(apiCallSuccessAction('Product deleted'));

      return productId;
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

export const rateProductAction = createAsyncThunk(
  'product/getProductAction',
  async (values, { dispatch, rejectWithValue, getState }) => {
    try {
      const { user } = getState();

      dispatch(apiCallStartAction());

      const { data } = await rateProductCall(
        values.productId,
        values.rating,
        user.token
      );

      dispatch(rateProductCall(`Product '${data.product.title}' rated`));

      return data.product;
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

export const getSimilarProductsAction = createAsyncThunk(
  'product/getSimilarProductsAction',
  async (productId, { dispatch, rejectWithValue }) => {
    try {
      dispatch(apiCallStartAction());

      const { data } = await getSimilarProductsCall(productId);

      dispatch(apiCallSuccessAction());

      return data.products;
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

const initialState = {
  all: { products: [], totalCount: 0 },
  newest: { products: [], totalCount: 0 },
  bestselling: { products: [], totalCount: 0 },
  selectedProduct: { product: null, similarProducts: [] },
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProductsAction.fulfilled, (state, action) => {
      const { productsType, products, totalCount } = action.payload;

      state[productsType].products = products;
      state[productsType].totalCount = totalCount;
    });
    builder.addCase(getProductAction.fulfilled, (state, action) => {
      state.selectedProduct.product = action.payload;
    });
    builder.addCase(createProductAction.fulfilled, (state, action) => {
      state.all.products = [...state.all.products, action.payload];
      state.all.totalCount = state.all.totalCount + 1;
    });
    builder.addCase(updateProductAction.fulfilled, (state, action) => {
      const untouchedProducts = state.all.products.filter(
        (product) => product._id !== action.payload._id
      );
      state.all.products = [...untouchedProducts, action.payload];
    });
    builder.addCase(deleteProductAction.fulfilled, (state, action) => {
      const filteredProducts = state.all.products.filter(
        (product) => product._id !== action.payload
      );
      state.all.products = filteredProducts;
      state.all.totalCount = state.all.totalCount - 1;
    });
    builder.addCase(getSimilarProductsAction.fulfilled, (state, action) => {
      state.selectedProduct.similarProducts = action.payload;
    });
  },
});

export default productSlice.reducer;
