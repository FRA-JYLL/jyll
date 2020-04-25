import React, { useState, Dispatch, SetStateAction } from 'react';
import { signup } from 'services/requests';
import { loginType } from 'redux/Login';
import './SignupForm.scss';

const SignupForm = ({
  login,
  setShouldShowSignup,
}: {
  login: loginType;
  setShouldShowSignup: Dispatch<SetStateAction<boolean>>;
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await signup(username, password);
    if (response === null) {
      setError(true);

      return;
    }

    setShouldShowSignup(false);
    if (response.userId && response.username) {
      login(response);
    }
  };

  return (
    <form className="signupForm-form" onSubmit={handleSubmit}>
      <p className="signupForm-label">Username</p>
      <input
        className="signupForm-input"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      />
      <p className="signupForm-label">Password</p>
      <input
        className="signupForm-input"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="signupForm-error">Error: this username is already taken!</p>}
      <input className="signupForm-input" type="submit" />
    </form>
  );
};

export default SignupForm;
