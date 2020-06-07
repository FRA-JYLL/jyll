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
          {pendingGames.map((pendingGame: PendingGame) => (
            <div className="pending-game">{pendingGame.name}</div>
          ))}
        </div>
        <div className="side-panel"></div>
      </div>

      <CreateGameModal isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export default GameSelectionPage;
