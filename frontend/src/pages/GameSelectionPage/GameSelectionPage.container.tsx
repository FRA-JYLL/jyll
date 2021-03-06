import { connect } from 'react-redux';
import { usernameSelector, logoutActionCreator } from 'redux/authentication';
import { resetGameDataActionCreator } from 'redux/game';
import {
  pendingGamesIdsSelector,
  getPendingGamesActionCreator,
  joinGameActionCreator,
  gamesWithUserIdsSelector,
  getGamesWithUserActionCreator,
  enterGameActionCreator,
  lobbyGamesSelector,
  leaveGameActionCreator,
  resetCurrentGameLobbyDataActionCreator,
} from 'redux/lobby';
import { RootState } from 'redux/root';
import GameSelectionPage from './GameSelectionPage.component';

const mapStateToProps = (state: RootState) => {
  return {
    username: usernameSelector(state),
    pendingGamesIds: pendingGamesIdsSelector(state),
    gamesWithUserIds: gamesWithUserIdsSelector(state),
    lobbyGames: lobbyGamesSelector(state),
  };
};

const mapDispatchToProps = {
  logout: logoutActionCreator,
  getPendingGames: getPendingGamesActionCreator,
  getGamesWithUser: getGamesWithUserActionCreator,
  joinGame: joinGameActionCreator,
  enterGame: enterGameActionCreator,
  leaveGame: leaveGameActionCreator,
  resetGameData: resetGameDataActionCreator,
  resetCurrentGameLobbyData: resetCurrentGameLobbyDataActionCreator,
};

export type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GameSelectionPage);
