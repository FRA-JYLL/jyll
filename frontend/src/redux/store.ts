import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { rootReducer } from './root';
import { watchGetUserInfo } from './authentication/sagas';

const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);

const not_so_typed_window = window as any;

const store = createStoreWithMiddleware(
  rootReducer,
  not_so_typed_window.__REDUX_DEVTOOLS_EXTENSION__ &&
    not_so_typed_window.__REDUX_DEVTOOLS_EXTENSION__()
);

function* watchAll() {
  yield all([watchGetUserInfo()]);
}

sagaMiddleware.run(watchAll);

export default store;
