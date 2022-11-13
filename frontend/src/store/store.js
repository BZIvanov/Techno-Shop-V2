import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';

// DEPRECATED reducers
import { apiCallReducer } from './reducers/api-call';
import { categoryReducer } from './reducers/category';
import { subcategoryReducer } from './reducers/subcategory';
import { productReducer } from './reducers/product';
import { filtersReducer } from './reducers/filters';

export const store = configureStore({
  reducer: {
    user: userReducer,
    // Deprecated reducers
    apiCall: apiCallReducer,
    category: categoryReducer,
    subcategory: subcategoryReducer,
    product: productReducer,
    filters: filtersReducer,
  },
});
