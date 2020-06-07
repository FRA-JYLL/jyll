import { formatDate } from 'services/utils';
import {
  GET_PENDING_GAMES_SUCCESS,
  LobbyState,
  LobbyActions,
  BackendPendingGame,
  PendingGame,
} from './types';

const initialLobbyState: LobbyState = {
  pendingGames: {},
};

const pendingGameFormatter = ({ id, name, creation_date }: BackendPendingGame) => ({
  id,
  name,
  creationDate: formatDate(creation_date),
});

export const lobbyReducer = (state: LobbyState = initialLobbyState, action: LobbyActions) => {
  switch (action.type) {
    case GET_PENDING_GAMES_SUCCESS:
      return {
        ...state,
        pendingGames: action.payload.pendingGames.reduce(
          (pendingGames: { [key: string]: PendingGame }, newPendingGame: BackendPendingGame) => ({
            ...pendingGames,
            [newPendingGame.id]: pendingGameFormatter(newPendingGame),
          }),
          {}
        ),
      };
    default:
      return state;
  }
};
