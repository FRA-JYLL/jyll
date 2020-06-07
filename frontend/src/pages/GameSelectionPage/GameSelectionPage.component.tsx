import React from 'react';
import { useTranslation } from 'react-i18next';
import { CreateGameModal } from 'components/modals';
import './GameSelectionPage.scss';
import { Props } from './GameSelectionPage.container';

const GameSelectionPage = ({ username, logout }: Props) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = React.useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div className="game-selection-container">
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

      <CreateGameModal isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export default GameSelectionPage;
