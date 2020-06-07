import { RootState } from 'redux/root';

export const pendingGamesSelector = (store: RootState) => store.lobby.pendingGames;

export const gamesWithUserSelector = (store: RootState) => store.lobby.gamesWithUser;
