import { connect } from 'react-redux';
import {
  endTurnActionCreator,
  endTurnDataSelector,
  fullPlayerSelector,
  getFullPlayerActionCreator,
  updateBuildingsBalanceActionCreator,
} from 'redux/game';
import { RootState } from 'redux/root';
import GamePage from './GamePage.component';

const mapStateToProps = (state: RootState) => {
  return {
    fullPlayer: fullPlayerSelector(state),
    endTurnData: endTurnDataSelector(state),
  };
};

const mapDispatchToProps = {
  endTurn: endTurnActionCreator,
  getFullPlayer: getFullPlayerActionCreator,
  updateBuildingsBalance: updateBuildingsBalanceActionCreator,
};

export type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
