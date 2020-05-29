import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './CredentialsForm.scss';
import { SignupRequest, LoginRequest } from 'redux/authentication/types';

const CredentialsForm = ({
  requireTokens,
  title,
  errorMessage,
}: {
  requireTokens: (username: string, password: string) => SignupRequest | LoginRequest;
  title: string;
  errorMessage: string;
}) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await requireTokens(username, password);

    // TODO: Handle error through sagas
    if (!success) {
      setError(true);

      return;
    }
  };

  return (
    <div className="credentialsForm-container">
      <h1 className="credentialsForm-title">{title}</h1>
      <form className="credentialsForm-form" onSubmit={handleSubmit}>
        <p className="credentialsForm-label">{t('pages.signup.username')}</p>
        <input
          className="credentialsForm-input"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <p className="credentialsForm-label">{t('pages.signup.password')}</p>
        <input
          className="credentialsForm-input"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="credentialsForm-error">{errorMessage}</p>}
        <input className="credentialsForm-input" type="submit" />
      </form>
    </div>
  );
};

export default CredentialsForm;
