import { RootState } from 'redux/root';
import { EndTurnData, FullPlayer } from './types';

export const endTurnDataSelector = (store: RootState): EndTurnData => store.game.endTurnData;

export const fullPlayerSelector = (store: RootState): FullPlayer | undefined =>
  store.game.fullPlayer;
