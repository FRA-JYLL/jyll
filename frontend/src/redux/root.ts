import { combineReducers } from 'redux';
import { authenticationReducer } from './authentication';
import { navigationReducer } from './navigation';
import { toastReducer } from './toast';

export const rootReducer = combineReducers({
  authentication: authenticationReducer,
  navigation: navigationReducer,
  toast: toastReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
