import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserCall,
  loginUserCall,
  logoutUserCall,
  getCurrentUserCall,
  updatePasswordCall,
  forgotPasswordCall,
  resetPasswordCall,
} from '../../../api/users';
import {
  apiCallStartAction,
  apiCallSuccessAction,
  apiCallFailAction,
} from '../api-call/apiCallSlice';

const initialState = {
  token: null,
  user: null,
};

// will result in dispatched action -> user/loginUser/pending | user/loginUser/fulfilled | user/loginUser/rejected
export const registerUserAction = createAsyncThunk(
  'user/loginUser',
  async (values, { dispatch, rejectWithValue }) => {
    try {
      dispatch(apiCallStartAction());

      const { data } = await registerUserCall(values);

      dispatch(apiCallSuccessAction());

      window.localStorage.setItem('userToken', data.token);

      return data;
    } catch (error) {
      // axios will return the error in response data, the last .error is the error from the backend
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

export const loginUserAction = createAsyncThunk(
  'user/loginUser',
  async (values, { dispatch, rejectWithValue }) => {
    try {
      dispatch(apiCallStartAction());

      const { data } = await loginUserCall(values);

      dispatch(apiCallSuccessAction('Login success'));

      window.localStorage.setItem('userToken', data.token);

      return data;
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

export const getCurrentUserAction = createAsyncThunk(
  'user/loginUser',
  async (token, { dispatch, rejectWithValue }) => {
    try {
      dispatch(apiCallStartAction());

      const { data } = await getCurrentUserCall(token);

      dispatch(apiCallSuccessAction());

      return { ...data, token };
    } catch (error) {
      // remove the token from local storage, if it already expired, so we don't attempt to dispatch this action
      if (error.response.data.error === 'jwt expired') {
        window.localStorage.removeItem('userToken');
      }

      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

export const logoutUserAction = createAsyncThunk(
  'user/logoutUser',
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      dispatch(apiCallStartAction());

      const { user } = getState();
      await logoutUserCall(user.token);

      dispatch(apiCallSuccessAction());

      window.localStorage.removeItem('userToken');

      return;
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

export const updatePasswordAction = createAsyncThunk(
  'user/updateUserPassword',
  async (values, { dispatch, rejectWithValue, getState }) => {
    try {
      dispatch(apiCallStartAction());

      const { user } = getState();
      await updatePasswordCall(values, user.token);

      dispatch(apiCallSuccessAction('Password updated'));

      return;
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

export const forgotPasswordAction = createAsyncThunk(
  'user/forgotPasswordAction',
  async (values, { dispatch, rejectWithValue }) => {
    try {
      dispatch(apiCallStartAction());

      await forgotPasswordCall(values);

      dispatch(apiCallSuccessAction(`Reset email sent to: ${values.email}`));

      return;
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

export const resetPasswordAction = createAsyncThunk(
  'user/resetPasswordAction',
  async (values, { dispatch, rejectWithValue }) => {
    try {
      dispatch(apiCallStartAction());

      await resetPasswordCall(values);

      dispatch(apiCallSuccessAction());

      return;
    } catch (error) {
      dispatch(apiCallFailAction(error.response.data.error));

      return rejectWithValue(error.response.data.error);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAction.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(registerUserAction.rejected, (state) => {
        state.token = null;
        state.user = null;
      })
      .addCase(logoutUserAction.fulfilled, (state) => {
        state.token = null;
        state.user = null;
      });
  },
});

export default userSlice.reducer;
