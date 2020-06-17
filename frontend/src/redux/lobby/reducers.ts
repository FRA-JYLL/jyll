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
  GET_CURRENT_GAME_PLAYERS_SUCCESS,
  BackendLobbyPlayer,
  LobbyPlayer,
} from './types';

const initialLobbyState: LobbyState = {
  games: {},
  pendingGamesIds: [],
  gamesWithUserIds: [],
  currentGamePlayers: {},
};

const lobbyGameFormatter = ({
  id,
  name,
  creation_date,
  is_pending,
  has_password,
}: BackendLobbyGame): LobbyGame => ({
  id,
  name,
  creationDate: formatDate(creation_date),
  isPending: is_pending,
  hasPassword: has_password,
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

const lobbyPlayerFormatter = ({
  id,
  username,
  is_admin,
  user,
  game,
  is_ready,
}: BackendLobbyPlayer): LobbyPlayer => ({
  id,
  username,
  isAdmin: is_admin,
  userId: user,
  gameId: game,
  isReady: is_ready,
});

const reducePlayers = (
  newLobbyPlayers: BackendLobbyPlayer[],
  previousLobbyPlayers: { [key: string]: LobbyPlayer }
): { [key: string]: LobbyPlayer } =>
  newLobbyPlayers.reduce(
    (lobbyPlayers: { [key: string]: LobbyPlayer }, newLobbyPlayer: BackendLobbyPlayer) => ({
      ...lobbyPlayers,
      [newLobbyPlayer.id]: lobbyPlayerFormatter(newLobbyPlayer),
    }),
    previousLobbyPlayers
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
    case GET_CURRENT_GAME_PLAYERS_SUCCESS:
      const players = action.payload.players;
      return {
        ...state,
        currentGamePlayers: reducePlayers(players, {}),
      };
    default:
      return state;
  }
};
