import React, { useState, Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import './CredentialsForm.scss';

const CredentialsForm = ({
  setShouldShowSignup,
  requireTokens,
  title,
  errorMessage,
}: {
  setShouldShowSignup: Dispatch<SetStateAction<boolean>>;
  requireTokens: (username: string, password: string) => Promise<boolean>;
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

    if (!success) {
      setError(true);

      return;
    }

    setShouldShowSignup(false);
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
