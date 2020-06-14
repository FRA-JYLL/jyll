import { RootState } from 'redux/root';

export const pendingGamesIdsSelector = (store: RootState) => store.lobby.pendingGamesIds;

export const gamesWithUserIdsSelector = (store: RootState) => store.lobby.gamesWithUserIds;

export const lobbyGamesSelector = (store: RootState) => store.lobby.games;

export const currentGameIdSelector = (store: RootState) => store.lobby.currentGameId;

export const currentGameSelector = (store: RootState) => {
  const currentGameId = store.lobby.currentGameId;

  if (!currentGameId) return;

  return store.lobby.games[currentGameId];
};

export const currentGamePlayersIdsSelector = (store: RootState) =>
  store.lobby.currentGamePlayersIds;

export const playerSelector = (store: RootState, id: string) => store.lobby.players[id];

export const currentGamePlayersSelector = (store: RootState) => {
  return store.lobby.currentGamePlayersIds
    .map((id: string) => playerSelector(store, id))
    .filter((value) => value !== undefined);
};
