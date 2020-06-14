import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './GameRoomPage.scss';
import { Props } from './GameRoomPage.container';
import { LobbyPlayer } from 'redux/lobby/types';

const GameRoomPage = ({
  username,
  currentGameId,
  currentGame,
  currentGamePlayersIds,
  currentGamePlayers,
  goBack,
  leaveGame,
  startGame,
  getGameDetails,
  getCurrentGamePlayers,
  getPlayerDetails,
}: Props) => {
  const { t } = useTranslation();

  useEffect(() => {
    currentGameId && getGameDetails(currentGameId);
  }, [getGameDetails, currentGameId]);

  // TODO: Trigger the next two useEffect hooks periodically

  useEffect(() => {
    currentGameId && getCurrentGamePlayers();
  }, [getCurrentGamePlayers, currentGameId]);

  useEffect(() => {
    currentGamePlayersIds.forEach((id: string) => getPlayerDetails(id));
  }, [getPlayerDetails, currentGamePlayersIds]);

  const leaveCurrentGame = () => {
    if (currentGame) leaveGame(currentGame.id);
  };

  return (
    <div className="game-room-container">
      <h1 className="game-room-title">{t('pages.gameRoom.title', { username })}</h1>
      <p className="game-room-title">{currentGame && currentGame.name}</p>
      {currentGamePlayers.map((player: LobbyPlayer) => (
        <p className="game-room-title">{player.id}</p>
      ))}
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
