import { combineReducers } from 'redux';
import { apiCallReducer } from './api-call';
import { userReducer } from './user';
import { categoryReducer } from './category';
import { subcategoryReducer } from './subcategory';
import { productReducer } from './product';
import { filtersReducer } from './filters';

const rootReducer = combineReducers({
  apiCall: apiCallReducer,
  user: userReducer,
  category: categoryReducer,
  subcategory: subcategoryReducer,
  product: productReducer,
  filters: filtersReducer,
});

export default rootReducer;
