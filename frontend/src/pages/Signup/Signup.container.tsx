import { connect } from 'react-redux';
import { signupActionCreator, loginActionCreator } from 'redux/authentication';
import Signup from './Signup.component';

const mapDispatchToProps = {
  signup: signupActionCreator,
  login: loginActionCreator,
};

export type Props = typeof mapDispatchToProps;

export default connect(null, mapDispatchToProps)(Signup);
