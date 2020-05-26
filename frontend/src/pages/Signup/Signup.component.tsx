import React, { Dispatch, SetStateAction } from 'react';
import { signup, login } from 'services/requests';
import CredentialsForm from 'components/forms/CredentialsForm';
import './Signup.scss';

const Signup = ({
  setShouldShowSignup,
}: {
  setShouldShowSignup: Dispatch<SetStateAction<boolean>>;
}) => (
  <div className="signup-container">
    <h1 className="signup-title">You aren't logged in!</h1>
    <p className="signup-subtitle">You bad turtle</p>
    <div className="forms-container">
      <CredentialsForm
        setShouldShowSignup={setShouldShowSignup}
        requireTokens={signup}
        title={'Signup'}
        errorMessage={'Error: this username is already taken'}
      />
      <CredentialsForm
        setShouldShowSignup={setShouldShowSignup}
        requireTokens={login}
        title={'Login'}
        errorMessage={'Error: username or password is invalid'}
      />
    </div>
  </div>
);

export default Signup;
