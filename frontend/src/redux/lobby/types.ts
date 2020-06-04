export const CREATE_GAME_REQUEST = 'CREATE_GAME_REQUEST';

export interface CreateGameRequest {
  type: typeof CREATE_GAME_REQUEST;
  payload: {
    gameName?: string;
    gamePassword?: string;
  };
}
