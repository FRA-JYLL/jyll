import { put, takeEvery, call, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
  SignupRequest,
  SIGNUP_REQUEST,
  LoginRequest,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_TOKENS_SUCCESS,
  GET_NEW_ACCESS_TOKEN_REQUEST,
} from './types';
import {
  signupRequest,
  loginRequest,
  getUserInfoRequest,
  getNewAccessTokenRequest,
} from 'services/requests';
import { setTokens, clearTokens } from 'services/utils';
import { accessTokenSelector, refreshTokenSelector } from './selectors';
import { getNewAccessTokenActionCreator, logoutActionCreator } from './actions';
import {
  showMainLoaderActionCreator,
  hideMainLoaderActionCreator,
  showToastActionCreator,
} from 'redux/navigation';

function* signupSaga(action: SignupRequest): SagaIterator {
  try {
    const response = yield call(signupRequest, action.payload);

    setTokens(response.access, response.refresh);

    yield put({
      type: GET_TOKENS_SUCCESS,
      payload: { accessToken: response.access, refreshToken: response.refresh },
    });
  } catch (error) {
    yield put(showToastActionCreator('signupError'));
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
    yield put(showToastActionCreator('loginError'));
  }
}

function* logoutSaga(): SagaIterator {
  clearTokens();

  yield put({ type: LOGOUT_SUCCESS });
}

function* loadTokensSaga(): SagaIterator {
  const accessToken = localStorage.accessToken;
  const refreshToken = localStorage.refreshToken;

  yield put({ type: GET_TOKENS_SUCCESS, payload: { accessToken, refreshToken } });
}

function* getUserInfoSaga(): SagaIterator {
  try {
    yield put(showMainLoaderActionCreator());

    let accessToken = yield select(accessTokenSelector);

    if (!accessToken) {
      yield call(loadTokensSaga);
      accessToken = yield select(accessTokenSelector);
    }

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
    yield put(getNewAccessTokenActionCreator());
  } finally {
    yield put(hideMainLoaderActionCreator());
  }
}

function* getNewAccessTokenSaga(): SagaIterator {
  try {
    let refreshToken = yield select(refreshTokenSelector);

    if (!refreshToken) {
      yield call(loadTokensSaga);
      refreshToken = yield select(refreshTokenSelector);
    }

    const response = yield call(getNewAccessTokenRequest, refreshToken);

    yield put({
      type: GET_TOKENS_SUCCESS,
      payload: {
        accessToken: response.access,
        refreshToken: refreshToken,
      },
    });
  } catch (error) {
    yield put(logoutActionCreator());
  }
}

export function* watchAuthentication() {
  yield takeEvery(SIGNUP_REQUEST, signupSaga);
  yield takeEvery(LOGIN_REQUEST, loginSaga);
  yield takeEvery(LOGOUT_REQUEST, logoutSaga);
  yield takeEvery(GET_USER_INFO_REQUEST, getUserInfoSaga);
  yield takeEvery(GET_NEW_ACCESS_TOKEN_REQUEST, getNewAccessTokenSaga);
}
