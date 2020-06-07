import { formatDate } from 'services/utils';
import {
  GET_PENDING_GAMES_SUCCESS,
  LobbyState,
  LobbyActions,
  BackendLobbyGame,
  LobbyGame,
  GET_GAMES_WITH_USER_SUCCESS,
} from './types';

const initialLobbyState: LobbyState = {
  pendingGames: {},
  gamesWithUser: {},
};

const lobbyGameFormatter = ({ id, name, creation_date, is_pending }: BackendLobbyGame) => ({
  id,
  name,
  creationDate: formatDate(creation_date),
  isPending: is_pending,
});

export const lobbyReducer = (state: LobbyState = initialLobbyState, action: LobbyActions) => {
  switch (action.type) {
    case GET_PENDING_GAMES_SUCCESS:
      return {
        ...state,
        pendingGames: action.payload.pendingGames.reduce(
          (pendingGames: { [key: string]: LobbyGame }, newPendingGame: BackendLobbyGame) => ({
            ...pendingGames,
            [newPendingGame.id]: lobbyGameFormatter(newPendingGame),
          }),
          {}
        ),
      };
    case GET_GAMES_WITH_USER_SUCCESS:
      return {
        ...state,
        gamesWithUser: action.payload.gamesWithUser.reduce(
          (gamesWithUser: { [key: string]: LobbyGame }, newGameWithUser: BackendLobbyGame) => ({
            ...gamesWithUser,
            [newGameWithUser.id]: lobbyGameFormatter(newGameWithUser),
          }),
          {}
        ),
      };
    default:
      return state;
  }
};
