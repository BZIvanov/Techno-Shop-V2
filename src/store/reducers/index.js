import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user';
import categoryReducer from './category';
import shopReducer from './shop';
import cartReducer from './cart';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'cart'],
};

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoryReducer,
  shop: shopReducer,
  cart: cartReducer,
});

export default persistReducer(persistConfig, rootReducer);
