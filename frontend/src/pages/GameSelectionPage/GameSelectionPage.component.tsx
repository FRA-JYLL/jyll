import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CreateGameModal, JoinGameModal } from 'components/modals';
import './GameSelectionPage.scss';
import { Props } from './GameSelectionPage.container';
import { LobbyGame } from 'redux/lobby';

const GameSelectionPage = ({
  username,
  pendingGames,
  gamesWithUser,
  logout,
  getPendingGames,
  getGamesWithUser,
  joinGame,
}: Props) => {
  const { t } = useTranslation();

  useEffect(() => {
    getPendingGames();
  }, [getPendingGames]);

  useEffect(() => {
    getGamesWithUser();
  }, [getGamesWithUser]);

  const [selectedGameId, setSelectedGameId] = React.useState('');

  const renderGamesList = (games: LobbyGame[]) =>
    games.map((game: LobbyGame) => (
      <div
        className={selectedGameId === game.id ? 'game-selected' : 'game-listed'}
        onClick={() => setSelectedGameId(game.id)}
      >
        {game.name}
      </div>
    ));

  const joinSelectedGameWithPassword = (password?: string) => {
    joinGame(selectedGameId, password);
  };

  /*const joinSelectedGameWithoutPassword = () => {
    joinGame(selectedGameId);
  };*/

  const renderGameInfo = (game?: LobbyGame) =>
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
          onClick={openJoinModal} // TODO: Replace with next line once hasPassword has been implemented
          // onClick={game.hasPassword ? openJoinModal : joinSelectedGameWithoutPassword}
        >
          {t('pages.gameSelection.join')}
        </button>
      </>
    );

  const [createModalIsOpen, setCreateModalIsOpen] = React.useState(false);
  const openCreateModal = () => setCreateModalIsOpen(true);
  const closeCreateModal = () => setCreateModalIsOpen(false);

  const [joinModalIsOpen, setJoinModalIsOpen] = React.useState(false);
  const openJoinModal = () => setJoinModalIsOpen(true);
  const closeJoinModal = () => setJoinModalIsOpen(false);

  return (
    <>
      <div className="main-container">
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
          {gamesWithUser && (
            <>
              <p className="games-list-section-title">{t('pages.gameSelection.myGames')}</p>
              <div className="games-list-section">
                {renderGamesList(Object.values(gamesWithUser))}
              </div>
            </>
          )}
          {pendingGames && (
            <>
              <p className="games-list-section-title">{t('pages.gameSelection.publicGames')}</p>
              <div className="games-list-section">
                {renderGamesList(Object.values(pendingGames))}
              </div>
            </>
          )}
        </div>

        <div className="side-panel">
          {renderGameInfo(gamesWithUser[selectedGameId] || pendingGames[selectedGameId])}
        </div>
      </div>

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
