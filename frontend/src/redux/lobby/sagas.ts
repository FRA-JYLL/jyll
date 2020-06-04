import { put, takeEvery, select, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { CreateGameRequest, CREATE_GAME_REQUEST } from './types';
import { showToastActionCreator } from 'redux/toast';
import { createGameRequest, getPendingGamesRequest } from 'services/requests';
import { accessTokenSelector } from 'redux/authentication';

function* createGameSaga(action: CreateGameRequest): SagaIterator {
  const { gameName, gamePassword } = action.payload;

  const accessToken = yield select(accessTokenSelector);
  try {
    yield call(createGameRequest, accessToken, gameName, gamePassword);

    console.log(yield call(getPendingGamesRequest, accessToken));
  } catch (error) {
    yield put(showToastActionCreator('gameCreationFailureError'));
  }
}

export function* watchLobby() {
  yield takeEvery(CREATE_GAME_REQUEST, createGameSaga);
}
