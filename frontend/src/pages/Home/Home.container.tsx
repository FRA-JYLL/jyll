import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { usernameSelector, logoutActionCreator } from 'redux/authentication';
import { RootState } from 'redux/root';
import Home from './Home.component';

const mapStateToProps = (state: RootState) => {
  return {
    username: usernameSelector(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => dispatch(logoutActionCreator()),
});

export type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
