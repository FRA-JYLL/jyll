import { combineReducers } from 'redux';
import { authenticationReducer } from './authentication';
import { navigationReducer } from './navigation';
import { toastReducer } from './toast';
import { lobbyReducer } from './lobby';
import { gameReducer } from './game';

export const rootReducer = combineReducers({
  authentication: authenticationReducer,
  lobby: lobbyReducer,
  navigation: navigationReducer,
  toast: toastReducer,
  game: gameReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
