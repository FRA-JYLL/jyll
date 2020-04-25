import { connect } from 'react-redux';
import { login } from 'redux/Login';
import SignupForm from './SignupForm.component';

export default connect(null, { login })(SignupForm);
