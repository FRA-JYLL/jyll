import { combineReducers } from 'redux';
import { loginReducer } from './Login';

export const rootReducer = combineReducers({
  login: loginReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
