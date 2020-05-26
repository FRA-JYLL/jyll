import React, { Dispatch, SetStateAction } from 'react';
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
      <CredentialsForm setShouldShowSignup={setShouldShowSignup} />
      <CredentialsForm setShouldShowSignup={setShouldShowSignup} isLogin />
    </div>
  </div>
);

export default Signup;
