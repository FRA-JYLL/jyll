export const CREATE_GAME_REQUEST = 'CREATE_GAME_REQUEST';
export const GET_PENDING_GAMES_REQUEST = 'GET_PENDING_GAMES_REQUEST';
export const GET_PENDING_GAMES_SUCCESS = 'GET_PENDING_GAMES_SUCCESS';

export interface PendingGame {
  id: string;
  name: string;
}

export type LobbyActions = GetPendingGamesSuccess;

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
  payload: { pendingGames: PendingGame[] };
}

export interface LobbyState {
  pendingGames: PendingGame[];
}
