import {
  registerUserCall,
  loginUserCall,
  logoutUserCall,
  updatePasswordCall,
  forgotPasswordCall,
  resetPasswordCall,
  getCurrentUserCall,
} from '../../api/users';
import {
  apiCallStartType,
  apiCallSuccessType,
  apiCallFailType,
  RESET_PASSWORD_CODE,
} from './';
import { actionType } from '../action-types';

export const loginOrRegisterUserType = (user, token) => ({
  type: actionType.REGISTER_OR_LOGIN,
  payload: { user, token },
});

export const logoutUserType = () => ({
  type: actionType.LOGOUT,
});

export const currentUserType = (user) => ({
  type: actionType.REGISTER_OR_LOGIN,
  payload: user,
});

export const registerUserAction = (values) => {
  return async (dispatch) => {
    dispatch(apiCallStartType());

    try {
      const { data } = await registerUserCall(values);
      dispatch(apiCallSuccessType());
      dispatch(loginOrRegisterUserType(data.user, data.token));
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
      dispatch(loginOrRegisterUserType(data.user, data.token));
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
      await logoutUserCall(user.token);
      dispatch(apiCallSuccessType());
      dispatch(logoutUserType());
    } catch (error) {
      dispatch(apiCallFailType(error.response.data.error));
    }
  };
};

export const updatePasswordAction = (passwordsData) => {
  return async (dispatch, getState) => {
    const { user } = getState();
    dispatch(apiCallStartType());

    try {
      await updatePasswordCall(passwordsData, user.token);
      dispatch(apiCallSuccessType('Password updated', RESET_PASSWORD_CODE));
    } catch (error) {
      dispatch(apiCallFailType(error.response.data.error));
    }
  };
};

export const forgotPasswordAction = (resetData) => {
  return async (dispatch) => {
    dispatch(apiCallStartType());

    try {
      await forgotPasswordCall(resetData);
      dispatch(apiCallSuccessType());
    } catch (error) {
      dispatch(apiCallFailType(error.message));
    }
  };
};

export const resetPasswordAction = (resetData) => {
  return async (dispatch) => {
    dispatch(apiCallStartType());

    try {
      await resetPasswordCall(resetData);
      dispatch(apiCallSuccessType('', RESET_PASSWORD_CODE));
    } catch (error) {
      dispatch(apiCallFailType(error.message));
    }
  };
};

export const getCurrentUserAction = (token) => {
  return async (dispatch) => {
    dispatch(apiCallStartType());

    try {
      const { data } = await getCurrentUserCall(token);
      dispatch(apiCallSuccessType());
      dispatch(loginOrRegisterUserType(data.user, token));
    } catch (error) {
      dispatch(apiCallFailType(error.message));
    }
  };
};
