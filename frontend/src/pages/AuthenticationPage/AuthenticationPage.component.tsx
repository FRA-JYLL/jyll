import React from 'react';
import CredentialsForm from 'components/forms/CredentialsForm';
import './AuthenticationPage.scss';
import { useTranslation } from 'react-i18next';
import { Props } from './AuthenticationPage.container';

const AuthenticationPage = ({ signup, login }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="signup-container">
      <h1 className="signup-title">{t('pages.signup.title')}</h1>
      <p className="signup-subtitle">{t('pages.signup.subtitle')}</p>
      <div className="forms-container">
        <CredentialsForm requireTokens={signup} title={t('pages.signup.signup')} />
        <CredentialsForm requireTokens={login} title={t('pages.signup.login')} />
      </div>
    </div>
  );
};

export default AuthenticationPage;
