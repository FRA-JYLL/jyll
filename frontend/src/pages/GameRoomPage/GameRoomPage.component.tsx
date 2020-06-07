import React from 'react';
import { useTranslation } from 'react-i18next';
import './GameRoomPage.scss';
import { Props } from './GameRoomPage.container';

const GameRoomPage = ({ username, goBack }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="game-room-container">
      <h1 className="game-room-title">{t('pages.gameRoom.title', { username })}</h1>
      <button className="button" onClick={goBack}>
        {t('pages.gameRoom.back')}
      </button>
    </div>
  );
};

export default GameRoomPage;
