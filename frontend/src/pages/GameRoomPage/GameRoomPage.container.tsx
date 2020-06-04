import { connect } from 'react-redux';
import { usernameSelector } from 'redux/authentication';
import { RootState } from 'redux/root';
import GameRoomPage from './GameRoomPage.component';
import { setNextPageActionCreator, NavigationPage } from 'redux/navigation';

const mapStateToProps = (state: RootState) => {
  return {
    username: usernameSelector(state),
  };
};

const mapDispatchToProps = {
  goBack: () => setNextPageActionCreator(NavigationPage.GameSelection),
};

export type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GameRoomPage);
