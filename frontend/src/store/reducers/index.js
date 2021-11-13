import { combineReducers } from 'redux';
import { apiCallReducer } from './api-call';
import { userReducer } from './user';
import { roomsReducer } from './rooms';

const rootReducer = combineReducers({
  apiCall: apiCallReducer,
  user: userReducer,
  rooms: roomsReducer,
});

export default rootReducer;
