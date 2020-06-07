import { RootState } from 'redux/root';

export const pendingGamesSelector = (store: RootState) => store.lobby.pendingGames;
