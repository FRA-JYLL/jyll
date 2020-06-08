import { RootState } from 'redux/root';

export const pendingGamesIdsSelector = (store: RootState) => store.lobby.pendingGamesIds;

export const gamesWithUserIdsSelector = (store: RootState) => store.lobby.gamesWithUserIds;

export const lobbyGamesSelector = (store: RootState) => store.lobby.games;

export const currentGameSelector = (store: RootState) => {
  const currentGameId = store.lobby.currentGameId;

  if (!currentGameId) return;

  return store.lobby.games[currentGameId];
};
