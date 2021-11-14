import { actionType } from '../action-types';

// callCode is used to differentiate different requests, for example to know if it was password reset
const initialState = {
  loading: false,
  success: '',
  error: '',
  callCode: 0,
};

export const apiCallReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.API_CALL_START:
      return { ...state, loading: true, success: '', error: '', callCode: 0 };
    case actionType.API_CALL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.message,
        error: '',
        callCode: action.payload.callCode,
      };
    case actionType.API_CALL_FAIL:
      return {
        ...state,
        loading: false,
        success: '',
        error: action.payload.message,
        callCode: action.payload.callCode,
      };
    case actionType.API_CALL_RESET:
      return initialState;
    default:
      return state;
  }
};
