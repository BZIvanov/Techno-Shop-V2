import axios from 'axios';
import {
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from './types';

export const fetchUserStart = () => ({
  type: FETCH_USER_START,
});

export const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

export const fetchUserFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});

export const fetchUserStartAsync = (username, email, password) => {
  return (dispatch) => {
    dispatch(fetchUserStart());
    console.log(username, email, password);
    axios
      .post(
        'http://localhost:3100/api/v1/auth/register',
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(fetchUserSuccess(response.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchUserFailure('Boom error'));
      });
  };
};
