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
      <div className="game-selection-container">
        <div className="game-selection-panel">
          <h1 className="game-selection-title">
            {t('pages.gameSelection.welcome', { username: username || 'stranger' })}
          </h1>
          <p className="game-selection-subtitle">{t('pages.gameSelection.subtitle')}</p>
          <p className="game-selection-text">{t('pages.gameSelection.enjoy')}</p>
          <button className="button" onClick={openModal}>
            {t('pages.gameSelection.createGame')}
          </button>
          <button className="button" onClick={logout}>
            {t('pages.gameSelection.logout')}
          </button>
        </div>
        <div className="game-selection-list">
          {pendingGames.map((pendingGame: PendingGame) => (
            <div className="pending-game">{pendingGame.name}</div>
          ))}
        </div>
      </div>

      <CreateGameModal isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export default GameSelectionPage;
