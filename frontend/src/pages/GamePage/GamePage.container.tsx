import { connect } from 'react-redux';
import {
  buildingsBalanceSelector,
  endTurnActionCreator,
  endTurnDataSelector,
  fullPlayerSelector,
  getFullPlayerActionCreator,
  updateBuildingsBalanceActionCreator,
} from 'redux/game';
import { NavigationPage, setNextPageActionCreator } from 'redux/navigation';
import { RootState } from 'redux/root';
import GamePage from './GamePage.component';

const mapStateToProps = (state: RootState) => {
  return {
    fullPlayer: fullPlayerSelector(state),
    endTurnData: endTurnDataSelector(state),
    buildingsBalance: buildingsBalanceSelector(state),
  };
};

const mapDispatchToProps = {
  endTurn: endTurnActionCreator,
  getFullPlayer: getFullPlayerActionCreator,
  updateBuildingsBalance: updateBuildingsBalanceActionCreator,
  exitGame: () => setNextPageActionCreator(NavigationPage.GameSelection),
};

export type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
