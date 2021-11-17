import { combineReducers } from 'redux';
import { apiCallReducer } from './api-call';
import { userReducer } from './user';
import { categoryReducer } from './category';

const rootReducer = combineReducers({
  apiCall: apiCallReducer,
  user: userReducer,
  category: categoryReducer,
});

export default rootReducer;
