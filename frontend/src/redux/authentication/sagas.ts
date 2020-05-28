import { put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS } from './types';
import { getUserInfoRequest } from 'services/requests';

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

export function* watchGetUserInfo() {
  yield takeEvery(GET_USER_INFO_REQUEST, getUserInfoSaga);
}
