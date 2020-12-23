import { connect } from 'react-redux';
import { RootState } from 'redux/root';
import GameRoomPage from './GameRoomPage.component';
import { setNextPageActionCreator, NavigationPage } from 'redux/navigation';
import {
  currentGameSelector,
  leaveGameActionCreator,
  getCurrentGamePlayersActionCreator,
  currentGamePlayersSelector,
  getGameDetailsActionCreator,
  currentGameIdSelector,
  userPlayerSelector,
  setIsReadyActionCreator,
  openGameActionCreator,
} from 'redux/lobby';

const mapStateToProps = (state: RootState) => {
  return {
    currentGameId: currentGameIdSelector(state),
    currentGame: currentGameSelector(state),
    currentGamePlayers: currentGamePlayersSelector(state),
    userPlayer: userPlayerSelector(state),
  };
};

const mapDispatchToProps = {
  goBack: () => setNextPageActionCreator(NavigationPage.GameSelection),
  leaveGame: leaveGameActionCreator,
  startGame: openGameActionCreator,
  getGameDetails: (id: string) => getGameDetailsActionCreator(id),
  getCurrentGamePlayers: getCurrentGamePlayersActionCreator,
  setIsReady: setIsReadyActionCreator,
};

export type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GameRoomPage);
