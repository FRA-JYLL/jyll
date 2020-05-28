import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { signupActionCreator, loginActionCreator } from 'redux/authentication';
import Signup from './Signup.component';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signup: (username: string, password: string) => dispatch(signupActionCreator(username, password)),
  login: (username: string, password: string) => dispatch(loginActionCreator(username, password)),
});

export type Props = ReturnType<typeof mapDispatchToProps>;

export default connect(null, mapDispatchToProps)(Signup);
