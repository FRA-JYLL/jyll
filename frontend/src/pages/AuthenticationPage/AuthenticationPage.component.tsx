import React from 'react';
import CredentialsForm from 'components/forms/CredentialsForm';
import './AuthenticationPage.scss';
import { useTranslation } from 'react-i18next';
import { Props } from './AuthenticationPage.container';

const AuthenticationPage = ({ signup, login }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="authentication-container">
      <h1 className="authentication-title">{t('pages.authentication.title')}</h1>
      <p className="authentication-subtitle">{t('pages.authentication.subtitle')}</p>
      <div className="forms-container">
        <CredentialsForm requireTokens={signup} title={t('pages.authentication.signup')} />
        <CredentialsForm requireTokens={login} title={t('pages.authentication.login')} />
      </div>
    </div>
  );
};

export default AuthenticationPage;
