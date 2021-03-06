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
import { NavigationPage, setNextPageActionCreator, currentPageSelector } from 'redux/navigation';
import { showToastActionCreator } from 'redux/toast';

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
  yield put(setNextPageActionCreator(NavigationPage.Authentication));
}

function* loadTokensSaga(): SagaIterator {
  const accessToken = localStorage.accessToken;
  const refreshToken = localStorage.refreshToken;

  yield put({ type: GET_TOKENS_SUCCESS, payload: { accessToken, refreshToken } });
}

function* getUserInfoSaga(): SagaIterator {
  const accessToken = yield select(accessTokenSelector);
  if (!accessToken) {
    yield call(loadTokensSaga);

    // Stop execution since the component will re-render
    if (yield select(accessTokenSelector)) {
      return;
    }
  }

  const currentPage = yield select(currentPageSelector);
  if (currentPage === NavigationPage.Authentication) {
    yield put(setNextPageActionCreator(NavigationPage.Loader));
  }

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

    if (
      currentPage === NavigationPage.Authentication ||
      currentPage === NavigationPage.FirstLoader
    ) {
      yield put(setNextPageActionCreator(NavigationPage.GameSelection));
    }
  } catch (error) {
    yield put(getNewAccessTokenActionCreator());
  }
}

function* getNewAccessTokenSaga(): SagaIterator {
  let refreshToken = yield select(refreshTokenSelector);

  try {
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

export function* sendAuthenticatedRequest(
  request: any,
  ...argsWithoutAccessToken: unknown[]
): SagaIterator {
  let response = undefined;

  let accessToken = yield select(accessTokenSelector);
  let argsWithAccessToken = [accessToken, ...argsWithoutAccessToken];

  try {
    response = yield call(request, ...argsWithAccessToken);
  } catch (error) {
    if (error === 401) {
      yield call(getNewAccessTokenSaga);

      accessToken = yield select(accessTokenSelector);
      argsWithAccessToken = [accessToken, ...argsWithoutAccessToken];

      try {
        response = yield call(request, ...argsWithAccessToken);
      } catch (error) {
        throw error;
      }
    } else throw error;
  }
  return response;
}

export function* watchAuthentication() {
  yield takeEvery(SIGNUP_REQUEST, signupSaga);
  yield takeEvery(LOGIN_REQUEST, loginSaga);
  yield takeEvery(LOGOUT_REQUEST, logoutSaga);
  yield takeEvery(GET_USER_INFO_REQUEST, getUserInfoSaga);
  yield takeEvery(GET_NEW_ACCESS_TOKEN_REQUEST, getNewAccessTokenSaga);
}
