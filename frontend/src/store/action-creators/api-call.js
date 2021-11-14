import { actionType } from '../action-types';

export const apiCallStartType = () => ({ type: actionType.API_CALL_START });

export const apiCallSuccessType = (message = '', callCode = 0) => ({
  type: actionType.API_CALL_SUCCESS,
  payload: { message, callCode },
});

export const apiCallFailType = (message = '', callCode = 0) => ({
  type: actionType.API_CALL_FAIL,
  payload: { message, callCode },
});

export const apiCallResetType = () => ({
  type: actionType.API_CALL_RESET,
});

// codes are used to differentiate different requests, for example to know if it was password reset
export const RESET_PASSWORD_CODE = 101;
