import { put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { CreateGameRequest, CREATE_GAME_REQUEST } from './types';
import { showToastActionCreator } from 'redux/toast';
import { createGameRequest } from 'services/requests';
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

export function* watchLobby() {
  yield takeEvery(CREATE_GAME_REQUEST, createGameSaga);
}
