export const CREATE_GAME_REQUEST = 'CREATE_GAME_REQUEST';
export const GET_PENDING_GAMES_REQUEST = 'GET_PENDING_GAMES_REQUEST';
export const GET_PENDING_GAMES_SUCCESS = 'GET_PENDING_GAMES_SUCCESS';
export const GET_GAMES_WITH_USER_REQUEST = 'GET_GAMES_WITH_USER_REQUEST';
export const GET_GAMES_WITH_USER_SUCCESS = 'GET_GAMES_WITH_USER_SUCCESS';
export const GET_GAME_DETAILS_REQUEST = 'GET_GAME_DETAILS_REQUEST';
export const GET_GAME_DETAILS_SUCCESS = 'GET_GAME_DETAILS_SUCCESS';
export const JOIN_GAME_REQUEST = 'JOIN_GAME_REQUEST';
export const ENTER_GAME_REQUEST = 'ENTER_GAME_REQUEST';
export const ENTER_GAME_SUCCESS = 'ENTER_GAME_SUCCESS';
export const OPEN_GAME = 'OPEN_GAME';
export const GET_CURRENT_GAME_PLAYERS_REQUEST = 'GET_CURRENT_GAME_PLAYERS_REQUEST';
export const GET_CURRENT_GAME_PLAYERS_SUCCESS = 'GET_CURRENT_GAME_PLAYERS_SUCCESS';
export const LEAVE_GAME_REQUEST = 'LEAVE_GAME_REQUEST';
export const SET_IS_READY_REQUEST = 'SET_IS_READY_REQUEST';
export const RESET_CURRENT_GAME_LOBBY_DATA = 'RESET_CURRENT_GAME_LOBBY_DATA';

export interface LobbyGame {
  id: string;
  name: string;
  creationDate: string;
  isPending: boolean;
  hasPassword: boolean;
}

export interface BackendLobbyGame {
  id: string;
  name: string;
  creation_date: string;
  is_pending: boolean;
  has_password: boolean;
}

export interface LobbyUser {
  id: string;
  username: string;
}

export interface BackendLobbyPlayer {
  id: string;
  username: string;
  is_admin: boolean;
  user: string;
  game: string;
  is_ready: boolean;
}

export interface LobbyPlayer {
  id: string;
  username: string;
  isAdmin: boolean;
  userId: string;
  gameId: string;
  isReady: boolean;
}

export type LobbyActions =
  | GetPendingGamesSuccess
  | GetGamesWithUserSuccess
  | GetGameDetailsSuccess
  | EnterGameSuccess
  | GetCurrentGamePlayersSuccess
  | ResetCurrentGameLobbyData;

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

export interface GetGameDetailsSuccess {
  type: typeof GET_GAME_DETAILS_SUCCESS;
  payload: { game: BackendLobbyGame };
}

export interface JoinGameRequest {
  type: typeof JOIN_GAME_REQUEST;
  payload: { id: string; password?: string };
}

export interface EnterGameRequest {
  type: typeof ENTER_GAME_REQUEST;
  payload: { id: string; isPending: boolean };
}

export interface EnterGameSuccess {
  type: typeof ENTER_GAME_SUCCESS;
  payload: { id: string };
}

export interface OpenGame {
  type: typeof OPEN_GAME;
}

export interface GetCurrentGamePlayersRequest {
  type: typeof GET_CURRENT_GAME_PLAYERS_REQUEST;
}

export interface GetCurrentGamePlayersSuccess {
  type: typeof GET_CURRENT_GAME_PLAYERS_SUCCESS;
  payload: { players: BackendLobbyPlayer[] };
}

export interface LeaveGameRequest {
  type: typeof LEAVE_GAME_REQUEST;
  payload: { id: string };
}

export interface SetIsReadyRequest {
  type: typeof SET_IS_READY_REQUEST;
  payload: {
    isReady: boolean;
  };
}

export interface ResetCurrentGameLobbyData {
  type: typeof RESET_CURRENT_GAME_LOBBY_DATA;
}

export interface LobbyState {
  games: { [key: string]: LobbyGame };
  pendingGamesIds: string[];
  gamesWithUserIds: string[];
  currentGameId?: string;
  currentGamePlayers: { [key: string]: LobbyPlayer };
}
