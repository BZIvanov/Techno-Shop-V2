import { registerUserCall } from '../../api/users';
import { apiCallStartType, apiCallSuccessType, apiCallFailType } from './';
import { actionType } from '../action-types';

export const loginOrRegisterUserType = (userData) => ({
  type: actionType.LOGIN,
  payload: userData,
});

export const registerUserAction = (values) => {
  return async (dispatch) => {
    dispatch(apiCallStartType());

    try {
      const { data } = await registerUserCall(values);

      dispatch(apiCallSuccessType());
      dispatch(loginOrRegisterUserType(data));
    } catch (error) {
      dispatch(apiCallFailType('Register user error'));
    }
  };
};
