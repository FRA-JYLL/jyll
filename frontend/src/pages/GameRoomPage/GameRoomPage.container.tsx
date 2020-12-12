import { connect } from 'react-redux';
import { usernameSelector } from 'redux/authentication';
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
} from 'redux/lobby';
import { getFullPlayerActionCreator } from 'redux/game';

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
  startGame: () => setNextPageActionCreator(NavigationPage.Game),
  getGameDetails: (id: string) => getGameDetailsActionCreator(id),
  getCurrentGamePlayers: getCurrentGamePlayersActionCreator,
  setIsReady: setIsReadyActionCreator,
  getFullPlayer: getFullPlayerActionCreator,
};

export type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GameRoomPage);
