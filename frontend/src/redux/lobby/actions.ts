import {
  CreateGameRequest,
  CREATE_GAME_REQUEST,
  GetPendingGamesRequest,
  GET_PENDING_GAMES_REQUEST,
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

export const getPendingGamesActionCreator = (
  gameName?: string,
  gamePassword?: string
): GetPendingGamesRequest => {
  return {
    type: GET_PENDING_GAMES_REQUEST,
  };
};

export type CreateGameActionCreator = typeof createGameActionCreator;
export type GetPendingGamesActionCreator = typeof getPendingGamesActionCreator;
