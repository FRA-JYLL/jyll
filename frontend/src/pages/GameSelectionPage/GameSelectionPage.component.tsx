import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CreateGameModal, JoinGameModal } from 'components/modals';
import './GameSelectionPage.scss';
import { Props } from './GameSelectionPage.container';
import { LobbyGame } from 'redux/lobby';
import { Monitor } from 'components/monitor';

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
}: Props) => {
  const { t } = useTranslation();

  useEffect(() => {
    getPendingGames();
  }, [getPendingGames]);

  useEffect(() => {
    getGamesWithUser();
  }, [getGamesWithUser]);

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

  const enterSelectedGame = () => {
    enterGame(selectedGameId);
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
          </div>
          <button
            className="side-panel-button"
            onClick={
              alreadyJoined
                ? enterSelectedGame
                : game.hasPassword
                ? openJoinModal
                : joinSelectedGameWithoutPassword
            }
          >
            {t('pages.gameSelection.join')}
          </button>
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
          <button className="side-panel-button" onClick={openCreateModal}>
            {t('pages.gameSelection.createGame')}
          </button>
          <button className="side-panel-button" onClick={logout}>
            {t('pages.gameSelection.logout')}
          </button>
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
