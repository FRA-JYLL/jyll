import { combineReducers } from 'redux';
import { authenticationReducer } from './authentication';
import { navigationReducer } from './navigation';

export const rootReducer = combineReducers({
  authentication: authenticationReducer,
  navigation: navigationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
