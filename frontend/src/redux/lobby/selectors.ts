import { RootState } from 'redux/root';

export const pendingGamesListSelector = (store: RootState) =>
  Object.values(store.lobby.pendingGames);

export const pendingGameSelector = (store: RootState, id: string) => store.lobby.pendingGames[id];
