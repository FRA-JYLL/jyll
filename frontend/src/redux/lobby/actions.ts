import { CreateGameRequest, CREATE_GAME_REQUEST } from './types';

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

export type CreateGameActionCreator = typeof createGameActionCreator;
