import { combineReducers } from 'redux';
import { apiCallReducer } from './api-call';
import { roomsReducer } from './rooms';

const rootReducer = combineReducers({
  apiCall: apiCallReducer,
  rooms: roomsReducer,
});

export default rootReducer;
