import React from 'react';
import CredentialsForm from 'components/forms/CredentialsForm';
import './AuthenticationPage.scss';
import { useTranslation } from 'react-i18next';
import { Props } from './AuthenticationPage.container';
import { Monitor } from 'components/monitor';

const AuthenticationPage = ({ signup, login }: Props) => {
  const { t } = useTranslation();
  return (
    <Monitor className="authentication-container">
      <h1 className="authentication-title">{t('pages.authentication.title')}</h1>
      <p className="authentication-subtitle">{t('pages.authentication.subtitle')}</p>
      <div className="forms-container">
        <CredentialsForm
          requireTokens={signup}
          title={t('pages.authentication.signup')}
          buttonLabel={t('pages.authentication.buttons.signup')}
        />
        <CredentialsForm
          requireTokens={login}
          title={t('pages.authentication.login')}
          buttonLabel={t('pages.authentication.buttons.login')}
        />
      </div>
    </Monitor>
  );
};

export default AuthenticationPage;
