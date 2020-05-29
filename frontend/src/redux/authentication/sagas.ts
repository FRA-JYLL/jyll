import { put, takeEvery, call, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
  SignupRequest,
  SIGNUP_REQUEST,
  LoginRequest,
  LOGIN_REQUEST,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_TOKENS_SUCCESS,
} from './types';
import { signupRequest, loginRequest, getUserInfoRequest } from 'services/requests';
import { setTokens } from 'services/utils';
import { accessTokenSelector } from './selectors';

function* signupSaga(action: SignupRequest): SagaIterator {
  try {
    const response = yield call(signupRequest, action.payload);

    setTokens(response.access, response.refresh);

    yield put({
      type: GET_TOKENS_SUCCESS,
      payload: { accessToken: response.access, refreshToken: response.refresh },
    });
  } catch (error) {
    // TODO: Display translated error in a banner
  }
}

function* loginSaga(action: LoginRequest): SagaIterator {
  try {
    const response = yield call(loginRequest, action.payload);

    setTokens(response.access, response.refresh);

    yield put({
      type: GET_TOKENS_SUCCESS,
      payload: { accessToken: response.access, refreshToken: response.refresh },
    });
  } catch (error) {
    // TODO: Display translated error in a banner
  }
}

function* getUserInfoSaga(): SagaIterator {
  const accessToken = (yield select(accessTokenSelector)) || localStorage.accessToken;
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
  } catch (error) {
    // TODO: Display translated error in a banner
  }
}

export function* watchAuthentication() {
  yield takeEvery(LOGIN_REQUEST, loginSaga);
  yield takeEvery(SIGNUP_REQUEST, signupSaga);
  yield takeEvery(GET_USER_INFO_REQUEST, getUserInfoSaga);
}
