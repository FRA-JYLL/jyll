import { put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
  SignupRequest,
  SIGNUP_REQUEST,
  LoginRequest,
  LOGIN_REQUEST,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
} from './types';
import { signupRequest, loginRequest, getUserInfoRequest } from 'services/requests';

function* signupSaga(action: SignupRequest): SagaIterator {
  try {
    const response = yield call(signupRequest, action.payload);

    if (response.access && response.refresh) {
      localStorage.setItem('accessToken', response.access);
      localStorage.setItem('refreshToken', response.refresh);
    }
  } catch (error) {}
}

function* loginSaga(action: LoginRequest): SagaIterator {
  try {
    const response = yield call(loginRequest, action.payload);

    if (response.access && response.refresh) {
      localStorage.setItem('accessToken', response.access);
      localStorage.setItem('refreshToken', response.refresh);
    }
  } catch (error) {}
}

function* getUserInfoSaga(): SagaIterator {
  const accessToken = localStorage.accessToken;
  try {
    const response = yield call(getUserInfoRequest, accessToken);

    yield put({
      type: GET_USER_INFO_SUCCESS,
      payload: {
        username: response.username,
        userId: response.id,
        lastLogin: response.last_login,
      },
    });
  } catch (error) {}
}

export function* watchAuthentication() {
  yield takeEvery(LOGIN_REQUEST, loginSaga);
  yield takeEvery(SIGNUP_REQUEST, signupSaga);
  yield takeEvery(GET_USER_INFO_REQUEST, getUserInfoSaga);
}
