import { put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
  CreateGameRequest,
  CREATE_GAME_REQUEST,
  GET_PENDING_GAMES_REQUEST,
  GetPendingGamesRequest,
  GET_PENDING_GAMES_SUCCESS,
  GetGameDetailsRequest,
  GET_GAME_DETAILS_REQUEST,
  JoinGameRequest,
  LeaveGameRequest,
  JOIN_GAME_REQUEST,
  LEAVE_GAME_REQUEST,
} from './types';
import { showToastActionCreator } from 'redux/toast';
import {
  createGameRequest,
  getPendingGamesRequest,
  getGameDetailsRequest,
  joinGameRequest,
  leaveGameRequest,
} from 'services/requests';
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

function* getGameDetailsSaga(action: GetGameDetailsRequest): SagaIterator {
  try {
    const response = yield call(sendAuthenticatedRequest, getGameDetailsRequest, action.payload.id);

    console.log(response);
  } catch (error) {}
}

function* joinGameSaga(action: JoinGameRequest): SagaIterator {
  try {
    const response = yield call(
      sendAuthenticatedRequest,
      joinGameRequest,
      action.payload.id,
      action.payload.password
    );

    console.log(response);
  } catch (error) {}
}

function* leaveGameSaga(action: LeaveGameRequest): SagaIterator {
  try {
    const response = yield call(sendAuthenticatedRequest, leaveGameRequest, action.payload.id);

    console.log(response);
  } catch (error) {}
}

export function* watchLobby() {
  yield takeEvery(CREATE_GAME_REQUEST, createGameSaga);
  yield takeEvery(GET_PENDING_GAMES_REQUEST, getPendingGamesSaga);
  yield takeEvery(GET_GAME_DETAILS_REQUEST, getGameDetailsSaga);
  yield takeEvery(JOIN_GAME_REQUEST, joinGameSaga);
  yield takeEvery(LEAVE_GAME_REQUEST, leaveGameSaga);
}
