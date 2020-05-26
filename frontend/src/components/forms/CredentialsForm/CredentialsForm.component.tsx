import React, { useState, Dispatch, SetStateAction } from 'react';
import { signup, login } from 'services/requests';
import './CredentialsForm.scss';

const CredentialsForm = ({
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
    <div className="credentialsForm-container">
      <h1 className="credentialsForm-title">{isLogin ? 'Login' : 'Signup'}</h1>
      <form className="credentialsForm-form" onSubmit={handleSubmit}>
        <p className="credentialsForm-label">Username</p>
        <input
          className="credentialsForm-input"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <p className="credentialsForm-label">Password</p>
        <input
          className="credentialsForm-input"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="credentialsForm-error">Error: this username is already taken!</p>}
        <input className="credentialsForm-input" type="submit" />
      </form>
    </div>
  );
};

export default CredentialsForm;
