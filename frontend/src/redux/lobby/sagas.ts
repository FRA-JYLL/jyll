import { put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
  CreateGameRequest,
  CREATE_GAME_REQUEST,
  GET_PENDING_GAMES_REQUEST,
  GetPendingGamesRequest,
  GET_PENDING_GAMES_SUCCESS,
} from './types';
import { showToastActionCreator } from 'redux/toast';
import { createGameRequest, getPendingGamesRequest } from 'services/requests';
import { setNextPageActionCreator, NavigationPage } from 'redux/navigation';
import { sendAuthenticatedRequest } from 'redux/authentication';

function* createGameSaga(action: CreateGameRequest): SagaIterator {
  const { gameName, gamePassword } = action.payload;

  try {
    yield call(sendAuthenticatedRequest, createGameRequest, gameName, gamePassword);

    yield put(setNextPageActionCreator(NavigationPage.GameRoom));
  } catch (error) {
    yield put(showToastActionCreator('gameCreationFailureError'));
  }
}

function* getPendingGamesSaga(action: GetPendingGamesRequest): SagaIterator {
  try {
    const response = yield call(sendAuthenticatedRequest, getPendingGamesRequest);

    yield put({ type: GET_PENDING_GAMES_SUCCESS, payload: { pendingGames: response } });
  } catch (error) {}
}

export function* watchLobby() {
  yield takeEvery(CREATE_GAME_REQUEST, createGameSaga);
  yield takeEvery(GET_PENDING_GAMES_REQUEST, getPendingGamesSaga);
}
