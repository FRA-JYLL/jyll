import React, { Dispatch, SetStateAction } from 'react';
import CredentialsForm from 'components/forms/CredentialsForm';
import './Signup.scss';
import { useTranslation } from 'react-i18next';
import { Props } from './Signup.container';

interface ComponentProps extends Props {
  setShouldShowSignup: Dispatch<SetStateAction<boolean>>;
}

const Signup = ({ setShouldShowSignup, signup, login }: ComponentProps) => {
  const { t } = useTranslation();
  return (
    <div className="signup-container">
      <h1 className="signup-title">{t('pages.signup.title')}</h1>
      <p className="signup-subtitle">{t('pages.signup.subtitle')}</p>
      <div className="forms-container">
        <CredentialsForm
          setShouldShowSignup={setShouldShowSignup}
          requireTokens={signup}
          title={t('pages.signup.signup')}
          errorMessage={t('pages.signup.usernameAlreadyTaken')}
        />
        <CredentialsForm
          setShouldShowSignup={setShouldShowSignup}
          requireTokens={login}
          title={t('pages.signup.login')}
          errorMessage={t('pages.signup.invalidCredentials')}
        />
      </div>
    </div>
  );
};

export default Signup;
