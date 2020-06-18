import {
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  user: null,
  errorMessage: undefined,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        errorMessage: undefined,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        user: null,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
