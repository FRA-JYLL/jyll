import { takeEvery, call, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { EndTurnRequest, END_TURN_REQUEST } from './types';
import { endTurnRequest } from 'services/requests';
import { sendAuthenticatedRequest } from 'redux/authentication';
import { endTurnDataSelector, fullPlayerSelector } from './selectors';
import { backendEndTurnDataFormatter } from './reducers';

function* endTurnRequestSaga(action: EndTurnRequest): SagaIterator {
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

export function* watchGame() {
  yield takeEvery(END_TURN_REQUEST, endTurnRequestSaga);
}
