import React from 'react';
import { useTranslation } from 'react-i18next';
import './GameRoomPage.scss';
import { Props } from './GameRoomPage.container';

const GameRoomPage = ({ username, currentGame, goBack }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="game-room-container">
      <h1 className="game-room-title">{t('pages.gameRoom.title', { username })}</h1>
      <p className="game-room-title">{currentGame && currentGame.name}</p>
      <button className="button" onClick={goBack}>
        {t('pages.gameRoom.back')}
      </button>
    </div>
  );
};

export default GameRoomPage;
