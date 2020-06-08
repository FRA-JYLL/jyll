import React from 'react';
import { useTranslation } from 'react-i18next';
import './GameRoomPage.scss';
import { Props } from './GameRoomPage.container';

const GameRoomPage = ({ username, currentGame, goBack, leaveGame, startGame }: Props) => {
  const { t } = useTranslation();

  const leaveCurrentGame = () => {
    if (currentGame) leaveGame(currentGame.id);
  };

  return (
    <div className="game-room-container">
      <h1 className="game-room-title">{t('pages.gameRoom.title', { username })}</h1>
      <p className="game-room-title">{currentGame && currentGame.name}</p>
      <button className="button" onClick={startGame}>
        {t('pages.gameRoom.start')}
      </button>
      <button className="button" onClick={goBack}>
        {t('pages.gameRoom.back')}
      </button>
      <button className="button" onClick={leaveCurrentGame}>
        {t('pages.gameRoom.leave')}
      </button>
    </div>
  );
};

export default GameRoomPage;
