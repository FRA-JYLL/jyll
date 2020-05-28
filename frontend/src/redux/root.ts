import { combineReducers } from 'redux';
import { authenticationReducer } from './authentication';

export const rootReducer = combineReducers({
  authentication: authenticationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
