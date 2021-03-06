import { put, takeEvery, delay, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
  ShowToastRequest,
  SHOW_TOAST_REQUEST,
  SHOW_TOAST_SUCCESS,
  HIDE_TOAST_SUCCESS,
  QUEUE_TOAST_SUCCESS,
} from './types';
import { toastQueueSelector } from './selectors';

function* showToastSaga(action: ShowToastRequest): SagaIterator {
  let toastQueue = yield select(toastQueueSelector);

  if (toastQueue.length === 0) {
    yield put({ type: QUEUE_TOAST_SUCCESS, payload: action.payload });
    toastQueue = yield select(toastQueueSelector);

    while (toastQueue.length > 0) {
      yield put({ type: SHOW_TOAST_SUCCESS });

      yield delay(toastQueue[0].duration);

      yield put({ type: HIDE_TOAST_SUCCESS });

      yield delay(500); // TODO: Import value to match duration of toast's exit transition

      toastQueue = yield select(toastQueueSelector);
    }
  }
}

export function* watchToast() {
  yield takeEvery(SHOW_TOAST_REQUEST, showToastSaga);
}
