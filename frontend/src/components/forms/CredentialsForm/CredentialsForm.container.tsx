import { connect } from 'react-redux';
import { login } from 'redux/Login';
import CredentialsForm from './CredentialsForm.component';

export default connect(null, { login })(CredentialsForm);
