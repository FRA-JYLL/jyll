import React from 'react';
import { useTranslation } from 'react-i18next';
import './GameSelectionPage.scss';
import { Props } from './GameSelectionPage.container';

const GameSelectionPage = ({ username, logout }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="game-selection-container">
      <h1 className="game-selection-title">
        {t('pages.home.welcome', { username: username || 'stranger' })}
      </h1>
      <p className="game-selection-subtitle">{t('pages.home.subtitle')}</p>
      <p className="game-selection-text">{t('pages.home.enjoy')}</p>
      <button className={'logout-button'} onClick={logout}>
        {t('pages.home.logout')}
      </button>
    </div>
  );
};

export default GameSelectionPage;
