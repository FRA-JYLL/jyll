import { combineReducers } from 'redux';
import { authenticationReducer } from './authentication';
import { navigationReducer } from './navigation';
import { toastReducer } from './toast';
import { lobbyReducer } from './lobby';

export const rootReducer = combineReducers({
  authentication: authenticationReducer,
  lobby: lobbyReducer,
  navigation: navigationReducer,
  toast: toastReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
