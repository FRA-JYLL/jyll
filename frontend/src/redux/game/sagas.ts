import { takeEvery, call, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { EndTurnRequest, END_TURN_REQUEST } from './types';
import { endTurnRequest } from 'services/requests';
import { sendAuthenticatedRequest } from 'redux/authentication';
import { userPlayerSelector } from 'redux/lobby';
import { endTurnDataSelector } from './selectors';
import { backendEndTurnDataFormatter } from './reducers';

function* endTurnRequestSaga(action: EndTurnRequest): SagaIterator {
  const userPlayer = yield select(userPlayerSelector);
  const endTurnData = yield select(endTurnDataSelector);
  if (userPlayer)
    try {
      yield call(
        sendAuthenticatedRequest,
        endTurnRequest,
        userPlayer.id,
        backendEndTurnDataFormatter(endTurnData)
      );
    } catch (error) {
      if (!Number.isInteger(error)) throw error;
    }
}

export function* watchGame() {
  yield takeEvery(END_TURN_REQUEST, endTurnRequestSaga);
}
