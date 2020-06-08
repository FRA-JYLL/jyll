import { connect } from 'react-redux';
import { usernameSelector, logoutActionCreator } from 'redux/authentication';
import {
  pendingGamesIdsSelector,
  getPendingGamesActionCreator,
  joinGameActionCreator,
  gamesWithUserIdsSelector,
  getGamesWithUserActionCreator,
  enterGameActionCreator,
  lobbyGamesSelector,
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
};

export type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GameSelectionPage);
