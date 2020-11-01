import {
  GetFullPlayerRequest,
  GET_FULL_PLAYER_REQUEST,
  EndTurnRequest,
  END_TURN_REQUEST,
} from './types';

export const endTurnActionCreator = (): EndTurnRequest => {
  return {
    type: END_TURN_REQUEST,
  };
};

export const getFullPlayerActionCreator = (): GetFullPlayerRequest => {
  return {
    type: GET_FULL_PLAYER_REQUEST,
  };
};

export type EndTurnActionCreator = typeof endTurnActionCreator;
export type GetFullPlayerActionCreator = typeof getFullPlayerActionCreator;
