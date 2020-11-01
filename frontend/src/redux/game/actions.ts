import { BeginTurnRequest, BEGIN_TURN_REQUEST, EndTurnRequest, END_TURN_REQUEST } from './types';

export const endTurnActionCreator = (): EndTurnRequest => {
  return {
    type: END_TURN_REQUEST,
  };
};

export const beginTurnActionCreator = (): BeginTurnRequest => {
  return {
    type: BEGIN_TURN_REQUEST,
  };
};

export type EndTurnActionCreator = typeof endTurnActionCreator;
export type BeginTurnActionCreator = typeof beginTurnActionCreator;
