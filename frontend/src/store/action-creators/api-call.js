import { actionType } from '../action-types';

export const apiCallStartType = () => ({ type: actionType.API_CALL_START });

export const apiCallSuccessType = (message = '') => ({
  type: actionType.API_CALL_SUCCESS,
  payload: message,
});

export const apiCallFailType = (message) => ({
  type: actionType.API_CALL_FAIL,
  payload: message,
});

export const apiCallResetType = () => ({
  type: actionType.API_CALL_RESET,
});
