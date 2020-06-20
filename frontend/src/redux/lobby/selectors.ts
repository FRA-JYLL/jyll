import { RootState } from 'redux/root';
import { LobbyPlayer } from './types';

export const pendingGamesIdsSelector = (store: RootState) => store.lobby.pendingGamesIds;

export const gamesWithUserIdsSelector = (store: RootState) => store.lobby.gamesWithUserIds;

export const lobbyGamesSelector = (store: RootState) => store.lobby.games;

export const currentGameIdSelector = (store: RootState) => store.lobby.currentGameId;

export const currentGameSelector = (store: RootState) => {
  const currentGameId = store.lobby.currentGameId;

  if (!currentGameId) return;

  return store.lobby.games[currentGameId];
};

export const currentGamePlayersSelector = (store: RootState) => store.lobby.currentGamePlayers;

export const userPlayerSelector = (store: RootState) =>
  Object.values(store.lobby.currentGamePlayers).find(
    (player: LobbyPlayer) => player.userId === store.authentication.userId
  );
