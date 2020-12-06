import { connect } from 'react-redux';
import { endTurnActionCreator, fullPlayerSelector, getFullPlayerActionCreator } from 'redux/game';
import { RootState } from 'redux/root';
import GamePage from './GamePage.component';

const mapStateToProps = (state: RootState) => {
  return {
    fullPlayer: fullPlayerSelector(state),
  };
};

const mapDispatchToProps = {
  endTurn: endTurnActionCreator,
  getFullPlayer: getFullPlayerActionCreator,
};

export type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
