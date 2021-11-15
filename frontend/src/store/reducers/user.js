import { actionType } from '../action-types';

const initialState = {
  token: null,
  user: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.REGISTER_OR_LOGIN:
      window.localStorage.setItem(
        'userToken',
        JSON.stringify(action.payload.token)
      );

      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case actionType.LOGOUT:
      window.localStorage.removeItem('userToken');

      return { ...initialState };
    case actionType.UPDATE_USER:
      return {
        ...state,
        user: Object.assign(state.user || {}, action.payload),
      };
    default:
      return state;
  }
};
