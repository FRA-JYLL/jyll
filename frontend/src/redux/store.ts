import { createStore } from 'redux';
import { rootReducer } from './root';

const not_so_typed_window = window as any;

export default createStore(
  rootReducer,
  not_so_typed_window.__REDUX_DEVTOOLS_EXTENSION__ && not_so_typed_window.__REDUX_DEVTOOLS_EXTENSION__()
);
