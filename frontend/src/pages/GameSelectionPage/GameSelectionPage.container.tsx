import { connect } from 'react-redux';
import { usernameSelector, logoutActionCreator } from 'redux/authentication';
import {
  pendingGamesSelector,
  getPendingGamesActionCreator,
  joinGameActionCreator,
} from 'redux/lobby';
import { RootState } from 'redux/root';
import GameSelectionPage from './GameSelectionPage.component';

const mapStateToProps = (state: RootState) => {
  return {
    username: usernameSelector(state),
    pendingGames: pendingGamesSelector(state),
  };
};

const mapDispatchToProps = {
  logout: logoutActionCreator,
  getPendingGames: getPendingGamesActionCreator,
  joinGame: joinGameActionCreator,
};

export type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GameSelectionPage);
