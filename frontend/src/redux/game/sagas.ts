import { takeEvery, call, select, put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { END_TURN_REQUEST, BEGIN_TURN_REQUEST, BEGIN_TURN_SUCCESS } from './types';
import { beginTurnRequest, endTurnRequest } from 'services/requests';
import { sendAuthenticatedRequest } from 'redux/authentication';
import { endTurnDataSelector, fullPlayerSelector } from './selectors';
import { backendEndTurnDataFormatter } from './reducers';

function* endTurnRequestSaga(): SagaIterator {
  const fullPlayer = yield select(fullPlayerSelector);
  const endTurnData = yield select(endTurnDataSelector);
  if (fullPlayer)
    try {
      yield call(
        sendAuthenticatedRequest,
        endTurnRequest,
        fullPlayer.id,
        backendEndTurnDataFormatter(endTurnData)
      );
    } catch (error) {
      if (!Number.isInteger(error)) throw error;
    }
}

function* beginTurnRequestSaga(): SagaIterator {
  const fullPlayer = yield select(fullPlayerSelector);
  if (fullPlayer)
    try {
      const newFullPlayer = yield call(sendAuthenticatedRequest, beginTurnRequest, fullPlayer.id);

      yield put({ type: BEGIN_TURN_SUCCESS, payload: { fullPlayer: newFullPlayer } });
    } catch (error) {
      if (!Number.isInteger(error)) throw error;
    }
}

export function* watchGame() {
  yield takeEvery(END_TURN_REQUEST, endTurnRequestSaga);
  yield takeEvery(BEGIN_TURN_REQUEST, beginTurnRequestSaga);
}
