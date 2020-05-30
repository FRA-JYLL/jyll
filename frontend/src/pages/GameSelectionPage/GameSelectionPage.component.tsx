import React from 'react';
import { useTranslation } from 'react-i18next';
import './GameSelectionPage.scss';
import { Props } from './GameSelectionPage.container';

const GameSelectionPage = ({ username, logout }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="home-container">
      <h1 className="home-title">
        {t('pages.home.welcome', { username: username || 'stranger' })}
      </h1>
      <p className="home-subtitle">{t('pages.home.subtitle')}</p>
      <p className="home-text">{t('pages.home.enjoy')}</p>
      <button onClick={logout}>{t('pages.home.logout')}</button>
    </div>
  );
};

export default GameSelectionPage;
