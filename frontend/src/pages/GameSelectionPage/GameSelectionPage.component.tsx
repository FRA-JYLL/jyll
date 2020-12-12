import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CreateGameModal, JoinGameModal } from 'components/modals';
import './GameSelectionPage.scss';
import { Props } from './GameSelectionPage.container';
import { LobbyGame } from 'redux/lobby';
import { Monitor } from 'components/monitor';
import { MonitorButton } from 'components/buttons/MonitorButton';

const GameSelectionPage = ({
  username,
  pendingGamesIds,
  gamesWithUserIds,
  lobbyGames,
  logout,
  getPendingGames,
  getGamesWithUser,
  joinGame,
  enterGame,
  leaveGame,
  resetGameData,
}: Props) => {
  const { t } = useTranslation();

  const refreshPeriod = 2000;
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    const setTimeoutId = setTimeout(() => setTimer(timer + 1), refreshPeriod);
    return () => clearTimeout(setTimeoutId);
  }, [timer]);

  useEffect(() => {
    getPendingGames();
  }, [getPendingGames, timer]);

  useEffect(() => {
    getGamesWithUser();
  }, [getGamesWithUser, timer]);

  useEffect(() => {
    resetGameData();
  }, [resetGameData]);

  const [selectedGameId, setSelectedGameId] = React.useState('');

  const renderGamesList = (ids: string[]) =>
    ids.map((id: string) => {
      const game = lobbyGames[id];
      return (
        game && (
          <div
            key={game.id}
            className={selectedGameId === game.id ? 'game-selected' : 'game-listed'}
            onClick={() => setSelectedGameId(game.id)}
          >
            {game.name}
            {game.hasPassword && (
              <span role="img" aria-label="lock">
                {' 🔒'}
              </span>
            )}
          </div>
        )
      );
    });

  const joinSelectedGameWithPassword = (password?: string) => {
    joinGame(selectedGameId, password);
  };

  const joinSelectedGameWithoutPassword = () => {
    joinGame(selectedGameId);
  };

  const enterSelectedPendingGame = () => {
    enterGame(selectedGameId, true);
  };

  const enterSelectedOngoingGame = () => {
    enterGame(selectedGameId, false);
  };

  const leaveSelectedGame = () => {
    leaveGame(selectedGameId);
  };

  const renderGameInfo = (game?: LobbyGame) => {
    const alreadyJoined = game && gamesWithUserIds.includes(game.id);
    return (
      game && (
        <>
          <div className="side-panel-game-info-container">
            <p className="side-panel-game-name">{game.name}</p>
            <p className="side-panel-instructions">
              {t('pages.gameSelection.created', { creationDate: game.creationDate })}
            </p>
            <p className="side-panel-instructions">
              {game.isPending ? t('pages.gameSelection.pending') : t('pages.gameSelection.ongoing')}
            </p>
          </div>
          <div className="game-selection-button-container">
            <MonitorButton
              onClick={
                alreadyJoined
                  ? game.isPending
                    ? enterSelectedPendingGame
                    : enterSelectedOngoingGame
                  : game.hasPassword
                  ? openJoinModal
                  : joinSelectedGameWithoutPassword
              }
            >
              {alreadyJoined ? t('pages.gameSelection.open') : t('pages.gameSelection.join')}
            </MonitorButton>
            {alreadyJoined && (
              <MonitorButton onClick={leaveSelectedGame}>
                {t('pages.gameSelection.leave')}
              </MonitorButton>
            )}
          </div>
        </>
      )
    );
  };

  const [createModalIsOpen, setCreateModalIsOpen] = React.useState(false);
  const openCreateModal = () => setCreateModalIsOpen(true);
  const closeCreateModal = () => setCreateModalIsOpen(false);

  const [joinModalIsOpen, setJoinModalIsOpen] = React.useState(false);
  const openJoinModal = () => setJoinModalIsOpen(true);
  const closeJoinModal = () => setJoinModalIsOpen(false);

  return (
    <>
      <Monitor className="main-container">
        <div className="side-panel">
          <div className="side-panel-text-container">
            <h1 className="side-panel-welcome">
              {t('pages.gameSelection.welcome', { username: username || 'stranger' })}
            </h1>
            <p className="side-panel-instructions">{t('pages.gameSelection.instructions')}</p>
          </div>
          <div className="game-selection-button-container">
            <MonitorButton onClick={openCreateModal}>
              {t('pages.gameSelection.createGame')}
            </MonitorButton>
            <MonitorButton onClick={logout}>{t('pages.gameSelection.logout')}</MonitorButton>
          </div>
        </div>

        <div className="games-list">
          {gamesWithUserIds && (
            <>
              <p className="games-list-section-title">{t('pages.gameSelection.myGames')}</p>
              <div className="games-list-section">{renderGamesList(gamesWithUserIds)}</div>
            </>
          )}
          {pendingGamesIds && (
            <>
              <p className="games-list-section-title">{t('pages.gameSelection.publicGames')}</p>
              <div className="games-list-section">{renderGamesList(pendingGamesIds)}</div>
            </>
          )}
        </div>

        <div className="side-panel">{renderGameInfo(lobbyGames[selectedGameId])}</div>
      </Monitor>

      <CreateGameModal isOpen={createModalIsOpen} closeModal={closeCreateModal} />

      <JoinGameModal
        isOpen={joinModalIsOpen}
        closeModal={closeJoinModal}
        onSubmit={joinSelectedGameWithPassword}
      />
    </>
  );
};

export default GameSelectionPage;
