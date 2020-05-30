import { connect } from 'react-redux';
import { signupActionCreator, loginActionCreator } from 'redux/authentication';
import AuthenticationPage from './AuthenticationPage.component';

const mapDispatchToProps = {
  signup: signupActionCreator,
  login: loginActionCreator,
};

export type Props = typeof mapDispatchToProps;

export default connect(null, mapDispatchToProps)(AuthenticationPage);
