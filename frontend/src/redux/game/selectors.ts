import { RootState } from 'redux/root';
import { EndTurnData } from './types';

export const endTurnDataSelector = (store: RootState): EndTurnData => store.game.endTurnData;
