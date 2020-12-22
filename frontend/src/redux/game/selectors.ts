import { LobbyPlayer } from 'redux/lobby/types';
import { RootState } from 'redux/root';
import { BuildingsBalance, EndTurnData, FullPlayer } from './types';

export const endTurnDataSelector = (store: RootState): EndTurnData => store.game.endTurnData;

export const buildingsBalanceSelector = (store: RootState): BuildingsBalance =>
  store.game.buildingsBalance;

export const currentMoneyModifierSelector = (store: RootState): number =>
  store.game.currentMoneyModifier;

export const fullPlayerSelector = (store: RootState): FullPlayer | undefined =>
  store.game.fullPlayer;

export const playerIdSelector = (store: RootState): string | undefined =>
  Object.values(store.lobby.currentGamePlayers).find(
    (player: LobbyPlayer) => player.userId === store.authentication.userId
  )?.id;
