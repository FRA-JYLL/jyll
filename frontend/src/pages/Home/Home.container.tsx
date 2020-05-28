import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { usernameSelector, getUserInfoActionCreator } from 'redux/authentication';
import { RootState } from 'redux/root';
import Home from './Home.component';
import { accessTokenSelector } from 'redux/authentication/selectors';

const mapStateToProps = (state: RootState) => {
  return {
    username: usernameSelector(state),
    accessToken: accessTokenSelector(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getUserInfo: () => dispatch(getUserInfoActionCreator()),
});

export type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
