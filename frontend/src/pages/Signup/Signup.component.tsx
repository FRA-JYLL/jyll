import React, { Dispatch, SetStateAction } from 'react';
import SignupForm from 'components/forms/SignupForm';
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
      <SignupForm setShouldShowSignup={setShouldShowSignup} />
      <SignupForm setShouldShowSignup={setShouldShowSignup} isLogin />
    </div>
  </div>
);

export default Signup;
