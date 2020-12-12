import {
  GetFullPlayerRequest,
  GET_FULL_PLAYER_REQUEST,
  EndTurnRequest,
  END_TURN_REQUEST,
  UpdateBuildingsBalance,
  UPDATE_BUILDINGS_BALANCE,
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

export const updateBuildingsBalanceActionCreator = (
  classIndex: string,
  modifier: number
): UpdateBuildingsBalance => {
  return {
    type: UPDATE_BUILDINGS_BALANCE,
    payload: { classIndex, modifier },
  };
};

export type EndTurnActionCreator = typeof endTurnActionCreator;
export type GetFullPlayerActionCreator = typeof getFullPlayerActionCreator;
export type UpdateBuildingsBalanceActionCreator = typeof updateBuildingsBalanceActionCreator;
