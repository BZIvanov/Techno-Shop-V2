import { combineReducers, configureStore } from '@reduxjs/toolkit';
import apiCallReducer from './features/api-call/apiCallSlice';
import userReducer from './features/user/userSlice';
import categoryReducer from './features/category/categorySlice';
import subcategoryReducer from './features/subcategory/subcategorySlice';
import productReducer from './features/product/productSlice';
import productsFilterReducer from './features/products-filter/productsFilterSlice';

const rootReducer = combineReducers({
  apiCall: apiCallReducer,
  user: userReducer,
  category: categoryReducer,
  subcategory: subcategoryReducer,
  product: productReducer,
  productsFilter: productsFilterReducer,
});

export const store = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};
