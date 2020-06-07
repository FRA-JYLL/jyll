import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CreateGameModal } from 'components/modals';
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

  const joinSelectedGame = () => {
    joinGame(selectedGameId);
  };

  const renderGameInfo = (game?: LobbyGame) =>
    game && (
      <>
        <div className="side-panel-game-info-container">
          <p className="side-panel-game-name">{game.name}</p>
          <p className="side-panel-instructions">
            {t('pages.gameSelection.created', { creationDate: game.creationDate })}
          </p>
        </div>
        <button className="side-panel-button" onClick={joinSelectedGame}>
          {t('pages.gameSelection.join')}
        </button>
      </>
    );

  const [isOpen, setIsOpen] = React.useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

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
          <button className="side-panel-button" onClick={openModal}>
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

      <CreateGameModal isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export default GameSelectionPage;
