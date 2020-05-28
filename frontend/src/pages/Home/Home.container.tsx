import { connect } from 'react-redux';
import { usernameSelector } from 'redux/authentication';
import { RootState } from 'redux/root';
import Home from './Home.component';

const mapStateToProps = (state: RootState) => {
  return {
    username: usernameSelector(state),
  };
};

export default connect(mapStateToProps)(Home);
