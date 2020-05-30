import { put, takeEvery, delay } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
  ShowToastRequest,
  SHOW_TOAST_REQUEST,
  SHOW_TOAST_SUCCESS,
  HIDE_TOAST_SUCCESS,
} from './types';

function* showToastSaga(action: ShowToastRequest): SagaIterator {
  const { message, duration } = action.payload;

  yield put({ type: SHOW_TOAST_SUCCESS, payload: { message } });

  yield delay(duration);

  yield put({ type: HIDE_TOAST_SUCCESS });
}

export function* watchNavigation() {
  yield takeEvery(SHOW_TOAST_REQUEST, showToastSaga);
}
