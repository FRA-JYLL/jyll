import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { rootReducer } from './root';
import { watchAuthentication } from './authentication';
import { watchToast } from './toast';
import { watchLobby } from './lobby';

const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);

const not_so_typed_window = window as any;

const store = createStoreWithMiddleware(
  rootReducer,
  not_so_typed_window.__REDUX_DEVTOOLS_EXTENSION__ &&
    not_so_typed_window.__REDUX_DEVTOOLS_EXTENSION__()
);

function* watchAll() {
  yield all([watchAuthentication(), watchToast(), watchLobby()]);
}

sagaMiddleware.run(watchAll);

export default store;
