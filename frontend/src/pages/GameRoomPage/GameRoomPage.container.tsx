import { connect } from 'react-redux';
import { usernameSelector } from 'redux/authentication';
import { RootState } from 'redux/root';
import GameRoomPage from './GameRoomPage.component';
import { setNextPageActionCreator, NavigationPage } from 'redux/navigation';
import { currentGameSelector } from 'redux/lobby';

const mapStateToProps = (state: RootState) => {
  return {
    username: usernameSelector(state),
    currentGame: currentGameSelector(state),
  };
};

const mapDispatchToProps = {
  goBack: () => setNextPageActionCreator(NavigationPage.GameSelection),
};

export type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GameRoomPage);
