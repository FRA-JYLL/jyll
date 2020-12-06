import { LobbyPlayer } from 'redux/lobby/types';
import { RootState } from 'redux/root';
import { EndTurnData, FullPlayer } from './types';

export const endTurnDataSelector = (store: RootState): EndTurnData => store.game.endTurnData;

export const fullPlayerSelector = (store: RootState): FullPlayer | undefined =>
  store.game.fullPlayer;

export const playerIdSelector = (store: RootState): string | undefined =>
  Object.values(store.lobby.currentGamePlayers).find(
    (player: LobbyPlayer) => player.userId === store.authentication.userId
  )?.id;
