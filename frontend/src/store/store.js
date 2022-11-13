import { configureStore } from '@reduxjs/toolkit';
import apiCallReducer from './features/api-call/apiCallSlice';
import userReducer from './features/user/userSlice';

// DEPRECATED reducers
import { categoryReducer } from './reducers/category';
import { subcategoryReducer } from './reducers/subcategory';
import { productReducer } from './reducers/product';
import { filtersReducer } from './reducers/filters';

export const store = configureStore({
  reducer: {
    apiCall: apiCallReducer,
    user: userReducer,
    // Deprecated reducers
    category: categoryReducer,
    subcategory: subcategoryReducer,
    product: productReducer,
    filters: filtersReducer,
  },
});
