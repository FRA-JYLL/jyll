import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Home.scss';
import { Props } from './Home.container';

const Home = ({ username, getUserInfo, accessToken }: Props) => {
  const { t } = useTranslation();

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo, accessToken]);

  return (
    <div className="home-container">
      <h1 className="home-title">
        {t('pages.home.welcome', { username: username || 'stranger' })}
      </h1>
      <p className="home-subtitle">{t('pages.home.subtitle')}</p>
      <p className="home-text">{t('pages.home.enjoy')}</p>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
      >
        {t('pages.home.clearButton')}
      </button>
    </div>
  );
};

export default Home;
