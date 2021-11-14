import {
  registerUserCall,
  loginUserCall,
  logoutUserCall,
  forgotPasswordCall,
} from '../../api/users';
import { apiCallStartType, apiCallSuccessType, apiCallFailType } from './';
import { actionType } from '../action-types';

export const loginOrRegisterUserType = (userData) => ({
  type: actionType.LOGIN,
  payload: userData,
});

export const logoutUserType = () => ({
  type: actionType.LOGOUT,
});

export const registerUserAction = (values) => {
  return async (dispatch) => {
    dispatch(apiCallStartType());

    try {
      const { data } = await registerUserCall(values);
      dispatch(apiCallSuccessType());
      dispatch(loginOrRegisterUserType(data.user));
    } catch (error) {
      // here is how we can find the error message from the backend with axios
      dispatch(apiCallFailType(error.response.data.error));
    }
  };
};

export const loginUserAction = (values) => {
  return async (dispatch) => {
    dispatch(apiCallStartType());

    try {
      const { data } = await loginUserCall(values);
      dispatch(apiCallSuccessType());
      dispatch(loginOrRegisterUserType(data.user));
    } catch (error) {
      dispatch(apiCallFailType(error.response.data.error));
    }
  };
};

export const logoutUserAction = (values) => {
  return async (dispatch, getState) => {
    const { user } = getState();
    dispatch(apiCallStartType());

    try {
      const token = user.user ? user.user.token : '';

      await logoutUserCall(token);
      dispatch(apiCallSuccessType());
      dispatch(logoutUserType());
    } catch (error) {
      dispatch(apiCallFailType(error.response.data.error));
    }
  };
};

export const forgotPasswordAction = (resetMailData) => {
  return async (dispatch) => {
    dispatch(apiCallStartType());

    try {
      await forgotPasswordCall(resetMailData);
      dispatch(apiCallSuccessType());
    } catch (error) {
      dispatch(apiCallFailType(error.message));
    }
  };
};
