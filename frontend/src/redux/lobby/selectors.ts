import { RootState } from 'redux/root';

export const pendingGamesSelector = (store: RootState) => store.lobby.pendingGames;

export const gamesWithUserSelector = (store: RootState) => store.lobby.gamesWithUser;

export const currentGameSelector = (store: RootState) => {
  const currentGameId = store.lobby.currentGameId;

  if (!currentGameId) return;

  return store.lobby.gamesWithUser[currentGameId] || store.lobby.pendingGames[currentGameId];
};
