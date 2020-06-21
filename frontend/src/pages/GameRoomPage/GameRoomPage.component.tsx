import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './GameRoomPage.scss';
import { Props } from './GameRoomPage.container';
import { LobbyPlayer } from 'redux/lobby/types';
import { Monitor } from 'components/monitor';

const GameRoomPage = ({
  username,
  currentGameId,
  currentGame,
  currentGamePlayers,
  userPlayer,
  goBack,
  leaveGame,
  startGame,
  getGameDetails,
  getCurrentGamePlayers,
  setIsReady,
}: Props) => {
  const { t } = useTranslation();

  const refreshPeriod = 2000;
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    const setTimeoutId = setTimeout(() => setTimer(timer + 1), refreshPeriod);
    return () => clearTimeout(setTimeoutId);
  }, [timer]);

  useEffect(() => {
    currentGameId && getGameDetails(currentGameId);
  }, [getGameDetails, currentGameId]);

  useEffect(() => {
    currentGameId && getCurrentGamePlayers();
  }, [getCurrentGamePlayers, currentGameId, timer]);

  const leaveCurrentGame = () => {
    currentGameId && leaveGame(currentGameId);
  };

  const toggleIsReady = () => {
    userPlayer && setIsReady(!userPlayer.isReady);
    setTimer(timer + 1); // Refresh players list
  };

  const renderPlayersList = () =>
    Object.values(currentGamePlayers).map((player: LobbyPlayer) => (
      <div className="player-line" key={player.id}>
        <p className={player.isAdmin ? 'player-name-admin' : undefined}>{player.username}</p>
        {player.isReady ? (
          <p className="player-ready">{t('pages.gameRoom.ready')}</p>
        ) : (
          <p className="player-notReady">{t('pages.gameRoom.notReady')}</p>
        )}
      </div>
    ));

  return (
    <Monitor className="main-container">
      <div className="side-panel">
        <div className="side-panel-text-container">
          <h1 className="game-name">{currentGame && currentGame.name}</h1>
        </div>
        <button className="side-panel-button" onClick={goBack}>
          {t('pages.gameRoom.buttons.back')}
        </button>
        <button className="side-panel-button" onClick={leaveCurrentGame}>
          {t('pages.gameRoom.buttons.leave')}
        </button>
      </div>

      <div className="players-list">{renderPlayersList()}</div>

      <div className="side-panel">
        <div className="side-panel-text-container" />
        <button className="side-panel-button" onClick={toggleIsReady}>
          {userPlayer && userPlayer.isReady
            ? t('pages.gameRoom.buttons.notReady')
            : t('pages.gameRoom.buttons.ready')}
        </button>
        <button className="side-panel-button" onClick={startGame}>
          {t('pages.gameRoom.buttons.start')}
        </button>
      </div>
    </Monitor>
  );
};

export default GameRoomPage;
