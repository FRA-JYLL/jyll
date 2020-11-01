import { EndTurnRequest, END_TURN_REQUEST } from './types';

export const endTurnActionCreator = (): EndTurnRequest => {
  return {
    type: END_TURN_REQUEST,
  };
};

export type EndTurnActionCreator = typeof endTurnActionCreator;
