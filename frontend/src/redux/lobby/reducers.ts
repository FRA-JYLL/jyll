import { GET_PENDING_GAMES_SUCCESS, LobbyState, LobbyActions } from './types';

const initialLobbyState: LobbyState = {
  pendingGames: [],
};

export const lobbyReducer = (state: LobbyState = initialLobbyState, action: LobbyActions) => {
  switch (action.type) {
    case GET_PENDING_GAMES_SUCCESS:
      return {
        ...state,
        pendingGames: action.payload.pendingGames,
      };
    default:
      return state;
  }
};
