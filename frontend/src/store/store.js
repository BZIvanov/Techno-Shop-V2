import { configureStore } from '@reduxjs/toolkit';
import apiCallReducer from './features/api-call/apiCallSlice';
import userReducer from './features/user/userSlice';
import categoryReducer from './features/category/categorySlice';
import subcategoryReducer from './features/subcategory/subcategorySlice';
import productReducer from './features/product/productSlice';

// DEPRECATED reducers
import { filtersReducer } from './reducers/filters';

export const store = configureStore({
  reducer: {
    apiCall: apiCallReducer,
    user: userReducer,
    category: categoryReducer,
    subcategory: subcategoryReducer,
    product: productReducer,
    // Deprecated reducers
    filters: filtersReducer,
  },
});
