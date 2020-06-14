import {
  CreateGameRequest,
  CREATE_GAME_REQUEST,
  GetPendingGamesRequest,
  GET_PENDING_GAMES_REQUEST,
  GetGameDetailsRequest,
  GET_GAME_DETAILS_REQUEST,
  JoinGameRequest,
  JOIN_GAME_REQUEST,
  LeaveGameRequest,
  LEAVE_GAME_REQUEST,
  GET_GAMES_WITH_USER_REQUEST,
  GetGamesWithUserRequest,
  EnterGameRequest,
  ENTER_GAME_REQUEST,
  GetPlayerDetailsRequest,
  GET_PLAYER_DETAILS_REQUEST,
  GetCurrentGamePlayersRequest,
  GET_CURRENT_GAME_PLAYERS_REQUEST,
} from './types';

export const createGameActionCreator = (
  gameName?: string,
  gamePassword?: string
): CreateGameRequest => {
  return {
    type: CREATE_GAME_REQUEST,
    payload: {
      gameName,
      gamePassword,
    },
  };
};

export const getPendingGamesActionCreator = (): GetPendingGamesRequest => {
  return {
    type: GET_PENDING_GAMES_REQUEST,
  };
};

export const getGamesWithUserActionCreator = (): GetGamesWithUserRequest => {
  return {
    type: GET_GAMES_WITH_USER_REQUEST,
  };
};

export const getGameDetailsActionCreator = (id: string): GetGameDetailsRequest => {
  return {
    type: GET_GAME_DETAILS_REQUEST,
    payload: { id },
  };
};

export const joinGameActionCreator = (id: string, password?: string): JoinGameRequest => {
  return {
    type: JOIN_GAME_REQUEST,
    payload: { id, password },
  };
};

export const enterGameActionCreator = (id: string): EnterGameRequest => {
  return {
    type: ENTER_GAME_REQUEST,
    payload: { id },
  };
};

export const getPlayerDetailsActionCreator = (id: string): GetPlayerDetailsRequest => {
  return {
    type: GET_PLAYER_DETAILS_REQUEST,
    payload: { id },
  };
};

export const getCurrentGamePlayersActionCreator = (): GetCurrentGamePlayersRequest => {
  return {
    type: GET_CURRENT_GAME_PLAYERS_REQUEST,
  };
};

export const leaveGameActionCreator = (id: string): LeaveGameRequest => {
  return {
    type: LEAVE_GAME_REQUEST,
    payload: { id },
  };
};

export type CreateGameActionCreator = typeof createGameActionCreator;
export type GetPendingGamesActionCreator = typeof getPendingGamesActionCreator;
export type GetGamesWithUserActionCreator = typeof getGamesWithUserActionCreator;
export type GetGameDetailsActionCreator = typeof getGameDetailsActionCreator;
export type JoinGameActionCreator = typeof joinGameActionCreator;
export type EnterGameActionCreator = typeof enterGameActionCreator;
export type GetPlayerDetailsActionCreator = typeof getPlayerDetailsActionCreator;
export type GetCurrentGamePlayersActionCreator = typeof getCurrentGamePlayersActionCreator;
export type LeaveGameActionCreator = typeof leaveGameActionCreator;
