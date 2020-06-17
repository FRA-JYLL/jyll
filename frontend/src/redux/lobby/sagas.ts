import { put, takeEvery, call, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
  CreateGameRequest,
  CREATE_GAME_REQUEST,
  GetPendingGamesRequest,
  GET_PENDING_GAMES_REQUEST,
  GET_PENDING_GAMES_SUCCESS,
  GetGameDetailsRequest,
  GET_GAME_DETAILS_REQUEST,
  GET_GAME_DETAILS_SUCCESS,
  JoinGameRequest,
  JOIN_GAME_REQUEST,
  LeaveGameRequest,
  LEAVE_GAME_REQUEST,
  GetGamesWithUserRequest,
  GET_GAMES_WITH_USER_REQUEST,
  GET_GAMES_WITH_USER_SUCCESS,
  EnterGameRequest,
  ENTER_GAME_REQUEST,
  ENTER_GAME_SUCCESS,
  GET_CURRENT_GAME_PLAYERS_SUCCESS,
  GET_CURRENT_GAME_PLAYERS_REQUEST,
} from './types';
import { showToastActionCreator } from 'redux/toast';
import {
  createGameRequest,
  getPendingGamesRequest,
  getGameDetailsRequest,
  joinGameRequest,
  leaveGameRequest,
  getGamesWithUserRequest,
  getGamePlayersRequest,
} from 'services/requests';
import { setNextPageActionCreator, NavigationPage } from 'redux/navigation';
import { sendAuthenticatedRequest } from 'redux/authentication';
import { enterGameActionCreator } from './actions';
import { currentGameIdSelector } from './selectors';

function* createGameSaga(action: CreateGameRequest): SagaIterator {
  yield put(setNextPageActionCreator(NavigationPage.Loader));

  const { gameName, gamePassword } = action.payload;

  try {
    yield call(sendAuthenticatedRequest, createGameRequest, gameName, gamePassword);

    // TODO: store game and put(enterGameActionCreator(id)) once the backend replies with the newly created game

    yield put(setNextPageActionCreator(NavigationPage.GameRoom));
  } catch (error) {
    yield put(setNextPageActionCreator(NavigationPage.GameSelection));
    yield put(showToastActionCreator('gameCreationFailureError'));
  }
}

function* getPendingGamesSaga(action: GetPendingGamesRequest): SagaIterator {
  try {
    const response = yield call(sendAuthenticatedRequest, getPendingGamesRequest);

    yield put({ type: GET_PENDING_GAMES_SUCCESS, payload: { pendingGames: response } });
  } catch (error) {
    if (!Number.isInteger(error)) throw error;
  }
}

function* getGamesWithUserSaga(action: GetGamesWithUserRequest): SagaIterator {
  try {
    const response = yield call(sendAuthenticatedRequest, getGamesWithUserRequest);

    yield put({ type: GET_GAMES_WITH_USER_SUCCESS, payload: { gamesWithUser: response } });
  } catch (error) {
    if (!Number.isInteger(error)) throw error;
  }
}

function* getGameDetailsSaga(action: GetGameDetailsRequest): SagaIterator {
  try {
    const response = yield call(sendAuthenticatedRequest, getGameDetailsRequest, action.payload.id);

    yield put({ type: GET_GAME_DETAILS_SUCCESS, payload: { game: response } });
  } catch (error) {
    if (!Number.isInteger(error)) throw error;
  }
}

function* joinGameSaga(action: JoinGameRequest): SagaIterator {
  yield put(setNextPageActionCreator(NavigationPage.Loader));

  try {
    yield call(
      sendAuthenticatedRequest,
      joinGameRequest,
      action.payload.id,
      action.payload.password
    );

    yield put(enterGameActionCreator(action.payload.id));
  } catch (error) {
    yield put(setNextPageActionCreator(NavigationPage.GameSelection));
    yield put(showToastActionCreator('cannotJoinGameError'));
  }
}

function* enterGameSaga(action: EnterGameRequest): SagaIterator {
  yield put({ type: ENTER_GAME_SUCCESS, payload: { id: action.payload.id } });

  yield put(setNextPageActionCreator(NavigationPage.GameRoom));
}

function* getCurrentGamePlayersSaga(): SagaIterator {
  const currentGameId = yield select(currentGameIdSelector);

  try {
    const players = yield call(sendAuthenticatedRequest, getGamePlayersRequest, currentGameId);

    yield put({ type: GET_CURRENT_GAME_PLAYERS_SUCCESS, payload: { players } });
  } catch (error) {
    if (!Number.isInteger(error)) throw error;
  }
}

function* leaveGameSaga(action: LeaveGameRequest): SagaIterator {
  try {
    yield call(sendAuthenticatedRequest, leaveGameRequest, action.payload.id);
  } catch (error) {
    if (!Number.isInteger(error)) throw error;
  } finally {
    yield put(setNextPageActionCreator(NavigationPage.GameSelection));
  }
}

export function* watchLobby() {
  yield takeEvery(CREATE_GAME_REQUEST, createGameSaga);
  yield takeEvery(GET_PENDING_GAMES_REQUEST, getPendingGamesSaga);
  yield takeEvery(GET_GAMES_WITH_USER_REQUEST, getGamesWithUserSaga);
  yield takeEvery(GET_GAME_DETAILS_REQUEST, getGameDetailsSaga);
  yield takeEvery(JOIN_GAME_REQUEST, joinGameSaga);
  yield takeEvery(ENTER_GAME_REQUEST, enterGameSaga);
  yield takeEvery(GET_CURRENT_GAME_PLAYERS_REQUEST, getCurrentGamePlayersSaga);
  yield takeEvery(LEAVE_GAME_REQUEST, leaveGameSaga);
}
