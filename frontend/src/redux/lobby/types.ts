export const CREATE_GAME_REQUEST = 'CREATE_GAME_REQUEST';
export const GET_PENDING_GAMES_REQUEST = 'GET_PENDING_GAMES_REQUEST';
export const GET_PENDING_GAMES_SUCCESS = 'GET_PENDING_GAMES_SUCCESS';
export const GET_GAMES_WITH_USER_REQUEST = 'GET_GAMES_WITH_USER_REQUEST';
export const GET_GAMES_WITH_USER_SUCCESS = 'GET_GAMES_WITH_USER_SUCCESS';
export const GET_GAME_DETAILS_REQUEST = 'GET_GAME_DETAILS_REQUEST';
export const JOIN_GAME_REQUEST = 'JOIN_GAME_REQUEST';
export const LEAVE_GAME_REQUEST = 'LEAVE_GAME_REQUEST';
export const SET_CURRENT_GAME_SUCCESS = 'SET_CURRENT_GAME_SUCCESS';

export interface LobbyGame {
  id: string;
  name: string;
  creationDate: string;
  isPending: boolean;
}

export interface BackendLobbyGame {
  id: string;
  name: string;
  creation_date: string;
  is_pending: boolean;
}

export type LobbyActions = GetPendingGamesSuccess | GetGamesWithUserSuccess | SetCurrentGameSuccess;

export interface CreateGameRequest {
  type: typeof CREATE_GAME_REQUEST;
  payload: {
    gameName?: string;
    gamePassword?: string;
  };
}

export interface GetPendingGamesRequest {
  type: typeof GET_PENDING_GAMES_REQUEST;
}

export interface GetPendingGamesSuccess {
  type: typeof GET_PENDING_GAMES_SUCCESS;
  payload: { pendingGames: BackendLobbyGame[] };
}

export interface GetGamesWithUserRequest {
  type: typeof GET_GAMES_WITH_USER_REQUEST;
}

export interface GetGamesWithUserSuccess {
  type: typeof GET_GAMES_WITH_USER_SUCCESS;
  payload: { gamesWithUser: BackendLobbyGame[] };
}

export interface GetGameDetailsRequest {
  type: typeof GET_GAME_DETAILS_REQUEST;
  payload: { id: string };
}

export interface JoinGameRequest {
  type: typeof JOIN_GAME_REQUEST;
  payload: { id: string; password?: string };
}

export interface LeaveGameRequest {
  type: typeof LEAVE_GAME_REQUEST;
  payload: { id: string };
}

export interface SetCurrentGameSuccess {
  type: typeof SET_CURRENT_GAME_SUCCESS;
  payload: { id: string };
}

export interface LobbyState {
  pendingGames: { [key: string]: LobbyGame };
  gamesWithUser: { [key: string]: LobbyGame };
  currentGameId?: string;
}
