import { takeLatest, call, put } from 'redux-saga/effects';
import { FETCH_USER_START } from '../actions/types';
import { fetchUserSuccess, fetchUserFailure } from '../actions/user';
import { registerUser } from '../api';

export function* fetchUserAsync({ payload: { username, email, password } }) {
  try {
    const user = yield call(registerUser, [username, email, password]);
    yield put(fetchUserSuccess(user));
  } catch (error) {
    yield put(fetchUserFailure(error.message));
  }
}

export default function* fetchUserStart() {
  yield takeLatest(FETCH_USER_START, fetchUserAsync);
}
