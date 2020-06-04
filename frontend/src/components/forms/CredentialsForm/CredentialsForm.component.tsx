import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './CredentialsForm.scss';
import { SignupRequest, LoginRequest } from 'redux/authentication/types';

const CredentialsForm = ({
  requireTokens,
  title,
}: {
  requireTokens: (username: string, password: string) => SignupRequest | LoginRequest;
  title: string;
}) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    requireTokens(username, password);
  };

  return (
    <div className="credentialsForm-container">
      <h1 className="credentialsForm-title">{title}</h1>
      <form className="credentialsForm-form" onSubmit={handleSubmit}>
        <p className="credentialsForm-label">{t('pages.authentication.username')}</p>
        <input
          className="credentialsForm-input"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <p className="credentialsForm-label">{t('pages.authentication.password')}</p>
        <input
          className="credentialsForm-input"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className="credentialsForm-input" type="submit" />
      </form>
    </div>
  );
};

export default CredentialsForm;
