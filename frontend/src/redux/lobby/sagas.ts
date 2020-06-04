import { put, takeEvery, select, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { CreateGameRequest, CREATE_GAME_REQUEST } from './types';
import { showToastActionCreator } from 'redux/toast';
import { createGameRequest } from 'services/requests';
import { accessTokenSelector } from 'redux/authentication';

function* createGameSaga(action: CreateGameRequest): SagaIterator {
  const { gameName, gamePassword } = action.payload;

  if (!gameName || gameName === '') {
    yield put(showToastActionCreator('gameCreationNoNameError'));
    return;
  }

  const accessToken = yield select(accessTokenSelector);
  try {
    yield call(createGameRequest, accessToken, gameName, gamePassword);
  } catch (error) {
    yield put(showToastActionCreator('gameCreationFailureError'));
  }
}

export function* watchLobby() {
  yield takeEvery(CREATE_GAME_REQUEST, createGameSaga);
}
