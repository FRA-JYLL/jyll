import { formatDate } from 'services/utils';
import {
  GET_PENDING_GAMES_SUCCESS,
  LobbyState,
  LobbyActions,
  BackendLobbyGame,
  LobbyGame,
  GET_GAMES_WITH_USER_SUCCESS,
  ENTER_GAME_SUCCESS,
  GET_GAME_DETAILS_SUCCESS,
} from './types';

const initialLobbyState: LobbyState = {
  games: {},
  pendingGamesIds: [],
  gamesWithUserIds: [],
};

const lobbyGameFormatter = ({ id, name, creation_date, is_pending }: BackendLobbyGame) => ({
  id,
  name,
  creationDate: formatDate(creation_date),
  isPending: is_pending,
});

const reduceGames = (
  newGames: BackendLobbyGame[],
  previousGames: { [key: string]: LobbyGame }
): { [key: string]: LobbyGame } =>
  newGames.reduce(
    (games: { [key: string]: LobbyGame }, newGame: BackendLobbyGame) => ({
      ...games,
      [newGame.id]: lobbyGameFormatter(newGame),
    }),
    previousGames
  );

const extractGamesIds = (games: BackendLobbyGame[]): string[] =>
  games.map((game: BackendLobbyGame) => game.id);

export const lobbyReducer = (
  state: LobbyState = initialLobbyState,
  action: LobbyActions
): LobbyState => {
  switch (action.type) {
    case GET_PENDING_GAMES_SUCCESS:
      const pendingGames = action.payload.pendingGames;
      return {
        ...state,
        games: reduceGames(pendingGames, state.games),
        pendingGamesIds: extractGamesIds(pendingGames),
      };
    case GET_GAMES_WITH_USER_SUCCESS:
      const gamesWithUser = action.payload.gamesWithUser;
      return {
        ...state,
        games: reduceGames(gamesWithUser, state.games),
        gamesWithUserIds: extractGamesIds(gamesWithUser),
      };
    case GET_GAME_DETAILS_SUCCESS:
      const game = action.payload.game;
      return {
        ...state,
        games: {
          ...state.games,
          [game.id]: lobbyGameFormatter(game),
        },
      };
    case ENTER_GAME_SUCCESS:
      return {
        ...state,
        currentGameId: action.payload.id,
      };
    default:
      return state;
  }
};
