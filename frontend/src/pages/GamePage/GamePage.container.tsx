import { connect } from 'react-redux';
import { endTurnActionCreator } from 'redux/game';
import { RootState } from 'redux/root';
import GamePage from './GamePage.component';

const mapStateToProps = (state: RootState) => {
  return {};
};

const mapDispatchToProps = {
  endTurn: endTurnActionCreator,
};

export type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
