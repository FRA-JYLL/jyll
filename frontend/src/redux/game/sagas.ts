import { takeEvery, call, select, put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
  BuildingAction,
  buildingActionTypes,
  BuildingsBalance,
  EndTurnData,
  END_TURN_REQUEST,
  GET_FULL_PLAYER_REQUEST,
  GET_FULL_PLAYER_SUCCESS,
  UPDATE_BUILDINGS_BALANCE,
} from './types';
import { getFullPlayerRequest, endTurnRequest } from 'services/requests';
import { sendAuthenticatedRequest } from 'redux/authentication';
import { buildingsBalanceSelector, endTurnDataSelector, playerIdSelector } from './selectors';
import { backendEndTurnDataFormatter } from './reducers';
import { currentGameSelector } from 'redux/lobby';
import {
  getFullPlayerActionCreator,
  resetBuildingActionsActionCreator,
  updateEndTurnDataActionCreator,
} from './actions';

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
      yield put(resetBuildingActionsActionCreator());
      yield put(getFullPlayerActionCreator());
    } catch (error) {
      if (!Number.isInteger(error)) throw error;
    }
}

function* updateEndTurnDataWithBuildingsBalance(): SagaIterator {
  let buildingActions: BuildingAction[] = [];
  const endTurnData: EndTurnData = yield select(endTurnDataSelector);
  const buildingsBalance: BuildingsBalance = yield select(buildingsBalanceSelector);
  for (const [classIndex, modifier] of Object.entries(buildingsBalance)) {
    if (modifier !== 0)
      buildingActions.push({
        classIndex,
        type: modifier > 0 ? buildingActionTypes.BUILD : buildingActionTypes.CLOSE,
        copies: Math.abs(modifier),
      });
  }
  yield put(updateEndTurnDataActionCreator({ ...endTurnData, buildingActions }));
}

export function* getFullPlayerRequestSaga(): SagaIterator {
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
  yield takeEvery(UPDATE_BUILDINGS_BALANCE, updateEndTurnDataWithBuildingsBalance);
}
