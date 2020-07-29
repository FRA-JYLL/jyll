import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './GameRoomPage.scss';
import { Props } from './GameRoomPage.container';
import { LobbyPlayer } from 'redux/lobby/types';
import { Monitor } from 'components/monitor';
import { MonitorButton } from 'components/buttons/MonitorButton';

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
        <div className="game-room-button-container">
          <MonitorButton onClick={goBack}>{t('pages.gameRoom.buttons.back')}</MonitorButton>
          <MonitorButton onClick={leaveCurrentGame}>
            {t('pages.gameRoom.buttons.leave')}
          </MonitorButton>
        </div>
      </div>

      <div className="players-list">{renderPlayersList()}</div>

      <div className="side-panel">
        <div className="side-panel-text-container" />
        <div className="game-room-button-container">
          <MonitorButton onClick={toggleIsReady}>
            {userPlayer && userPlayer.isReady
              ? t('pages.gameRoom.buttons.notReady')
              : t('pages.gameRoom.buttons.ready')}
          </MonitorButton>
          <MonitorButton onClick={startGame}>{t('pages.gameRoom.buttons.start')}</MonitorButton>
        </div>
      </div>
    </Monitor>
  );
};

export default GameRoomPage;
