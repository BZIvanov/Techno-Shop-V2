import { configureStore } from '@reduxjs/toolkit';
import apiCallReducer from './features/api-call/apiCallSlice';
import userReducer from './features/user/userSlice';
import categoryReducer from './features/category/categorySlice';

// DEPRECATED reducers
import { subcategoryReducer } from './reducers/subcategory';
import { productReducer } from './reducers/product';
import { filtersReducer } from './reducers/filters';

export const store = configureStore({
  reducer: {
    apiCall: apiCallReducer,
    user: userReducer,
    category: categoryReducer,
    // Deprecated reducers
    subcategory: subcategoryReducer,
    product: productReducer,
    filters: filtersReducer,
  },
});
