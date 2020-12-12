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
  GetCurrentGamePlayersRequest,
  GET_CURRENT_GAME_PLAYERS_REQUEST,
  SetIsReadyRequest,
  SET_IS_READY_REQUEST,
  ResetCurrentGameLobbyData,
  RESET_CURRENT_GAME_LOBBY_DATA,
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

export const enterGameActionCreator = (id: string, isPending: boolean): EnterGameRequest => {
  return {
    type: ENTER_GAME_REQUEST,
    payload: { id, isPending },
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

export const setIsReadyActionCreator = (isReady: boolean): SetIsReadyRequest => {
  return {
    type: SET_IS_READY_REQUEST,
    payload: { isReady },
  };
};

export const resetCurrentGameLobbyDataActionCreator = (): ResetCurrentGameLobbyData => {
  return {
    type: RESET_CURRENT_GAME_LOBBY_DATA,
  };
};

export type CreateGameActionCreator = typeof createGameActionCreator;
export type GetPendingGamesActionCreator = typeof getPendingGamesActionCreator;
export type GetGamesWithUserActionCreator = typeof getGamesWithUserActionCreator;
export type GetGameDetailsActionCreator = typeof getGameDetailsActionCreator;
export type JoinGameActionCreator = typeof joinGameActionCreator;
export type EnterGameActionCreator = typeof enterGameActionCreator;
export type GetCurrentGamePlayersActionCreator = typeof getCurrentGamePlayersActionCreator;
export type LeaveGameActionCreator = typeof leaveGameActionCreator;
export type SetIsReadyActionCreator = typeof setIsReadyActionCreator;
export type ResetCurrentGameLobbyDataActionCreator = typeof resetCurrentGameLobbyDataActionCreator;
