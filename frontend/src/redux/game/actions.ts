import {
  GetFullPlayerRequest,
  GET_FULL_PLAYER_REQUEST,
  EndTurnRequest,
  END_TURN_REQUEST,
  UpdateBuildingsBalance,
  UPDATE_BUILDINGS_BALANCE,
  EndTurnData,
  UpdateEndTurnData,
  UPDATE_END_TURN_DATA,
  RESET_BUILDING_ACTIONS,
  ResetBuildingActions,
  ResetGameData,
  RESET_GAME_DATA,
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
  copiesModifier: number,
  moneyModifier: number
): UpdateBuildingsBalance => {
  return {
    type: UPDATE_BUILDINGS_BALANCE,
    payload: { classIndex, copiesModifier, moneyModifier },
  };
};

export const resetBuildingActionsActionCreator = (): ResetBuildingActions => {
  return {
    type: RESET_BUILDING_ACTIONS,
  };
};

export const updateEndTurnDataActionCreator = (endTurnData: EndTurnData): UpdateEndTurnData => {
  return {
    type: UPDATE_END_TURN_DATA,
    payload: { endTurnData },
  };
};

export const resetGameDataActionCreator = (): ResetGameData => {
  return {
    type: RESET_GAME_DATA,
  };
};

export type EndTurnActionCreator = typeof endTurnActionCreator;
export type GetFullPlayerActionCreator = typeof getFullPlayerActionCreator;
export type UpdateBuildingsBalanceActionCreator = typeof updateBuildingsBalanceActionCreator;
export type ResetBuildingActionsActionCreator = typeof resetBuildingActionsActionCreator;
export type UpdateEndTurnDataActionCreator = typeof updateEndTurnDataActionCreator;
export type ResetGameDataActionCreator = typeof resetGameDataActionCreator;
