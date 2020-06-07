import { connect } from 'react-redux';
import { usernameSelector, logoutActionCreator } from 'redux/authentication';
import {
  pendingGamesSelector,
  getPendingGamesActionCreator,
  joinGameActionCreator,
  gamesWithUserSelector,
  getGamesWithUserActionCreator,
} from 'redux/lobby';
import { RootState } from 'redux/root';
import GameSelectionPage from './GameSelectionPage.component';

const mapStateToProps = (state: RootState) => {
  return {
    username: usernameSelector(state),
    pendingGames: pendingGamesSelector(state),
    gamesWithUser: gamesWithUserSelector(state),
  };
};

const mapDispatchToProps = {
  logout: logoutActionCreator,
  getPendingGames: getPendingGamesActionCreator,
  getGamesWithUser: getGamesWithUserActionCreator,
  joinGame: joinGameActionCreator,
};

export type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GameSelectionPage);
