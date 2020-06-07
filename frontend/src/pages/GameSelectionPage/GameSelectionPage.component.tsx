import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CreateGameModal } from 'components/modals';
import './GameSelectionPage.scss';
import { Props } from './GameSelectionPage.container';
import { PendingGame } from 'redux/lobby';

const GameSelectionPage = ({ username, pendingGames, logout, getPendingGames }: Props) => {
  const { t } = useTranslation();

  useEffect(() => {
    getPendingGames();
  }, [getPendingGames]);

  const [selectedGameId, setSelectedGameId] = React.useState('');

  const pendingGamesList = Object.values(pendingGames).map((pendingGame: PendingGame) => (
    <div
      className={selectedGameId === pendingGame.id ? 'pending-game-selected' : 'pending-game'}
      onClick={() => setSelectedGameId(pendingGame.id)}
    >
      {pendingGame.name}
    </div>
  ));

  const joinGame = () => {};

  const renderGameInfo = (game?: PendingGame) =>
    game && (
      <>
        <div className="side-panel-game-info-container">
          <p className="side-panel-game-name">{game.name}</p>
          <p className="side-panel-instructions">
            {t('pages.gameSelection.created', { creationDate: game.creationDate })}
          </p>
        </div>
        <button className="side-panel-button" onClick={joinGame}>
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

        <div className="games-list">{pendingGamesList}</div>

        <div className="side-panel">{renderGameInfo(pendingGames[selectedGameId])}</div>
      </div>

      <CreateGameModal isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export default GameSelectionPage;
