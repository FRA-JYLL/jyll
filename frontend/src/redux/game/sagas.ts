import { takeEvery, call, select, put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { END_TURN_REQUEST, GET_FULL_PLAYER_REQUEST, GET_FULL_PLAYER_SUCCESS } from './types';
import { getFullPlayerRequest, endTurnRequest } from 'services/requests';
import { sendAuthenticatedRequest } from 'redux/authentication';
import { endTurnDataSelector, playerIdSelector } from './selectors';
import { backendEndTurnDataFormatter } from './reducers';
import { currentGameSelector } from 'redux/lobby';

function* endTurnRequestSaga(): SagaIterator {
  const currentGame = yield select(currentGameSelector);
  const endTurnData = yield select(endTurnDataSelector);
  if (currentGame)
    try {
      yield call(
        sendAuthenticatedRequest,
        endTurnRequest,
        currentGame.id,
        backendEndTurnDataFormatter(endTurnData)
      );
    } catch (error) {
      if (!Number.isInteger(error)) throw error;
    }
}

function* getFullPlayerRequestSaga(): SagaIterator {
  const playerId = yield select(playerIdSelector);
  if (playerId)
    try {
      const newFullPlayer = yield call(sendAuthenticatedRequest, getFullPlayerRequest, playerId);

      yield put({ type: GET_FULL_PLAYER_SUCCESS, payload: { fullPlayer: newFullPlayer } });
    } catch (error) {
      if (!Number.isInteger(error)) throw error;
    }
}

export function* watchGame() {
  yield takeEvery(END_TURN_REQUEST, endTurnRequestSaga);
  yield takeEvery(GET_FULL_PLAYER_REQUEST, getFullPlayerRequestSaga);
}
