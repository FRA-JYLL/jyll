import { connect } from 'react-redux';
import { getUsername } from 'redux/Login';
import { RootState } from 'redux/root';
import Home from './Home.component';

const mapStateToProps = (state: RootState) => {
  return {
    username: getUsername(state),
  };
};

export default connect(mapStateToProps)(Home);
