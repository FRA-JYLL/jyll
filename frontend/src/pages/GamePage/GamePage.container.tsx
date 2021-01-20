import { connect } from 'react-redux';
import {
  buildingsBalanceSelector,
  currentMoneyModifierSelector,
  endTurnActionCreator,
  endTurnDataSelector,
  fullPlayerSelector,
  getNewTurnDataRequestActionCreator,
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
    currentMoneyModifier: currentMoneyModifierSelector(state),
  };
};

const mapDispatchToProps = {
  endTurn: endTurnActionCreator,
  updateBuildingsBalance: updateBuildingsBalanceActionCreator,
  exitGame: () => setNextPageActionCreator(NavigationPage.GameSelection),
  getNewTurnData: getNewTurnDataRequestActionCreator,
};

export type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
