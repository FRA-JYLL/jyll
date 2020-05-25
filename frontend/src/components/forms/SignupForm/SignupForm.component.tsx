import React, { useState, Dispatch, SetStateAction } from 'react';
import { signup, login } from 'services/requests';
import './SignupForm.scss';

const SignupForm = ({
  setShouldShowSignup,
  isLogin,
}: {
  setShouldShowSignup: Dispatch<SetStateAction<boolean>>;
  isLogin?: Boolean;
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await (isLogin ? login(username, password) : signup(username, password));

    if (!success) {
      setError(true);

      return;
    }

    setShouldShowSignup(false);
  };

  return (
    <div className="signupForm-container">
      <h1 className="signupForm-title">{isLogin ? 'Login' : 'Signup'}</h1>
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
    </div>
  );
};

export default SignupForm;
