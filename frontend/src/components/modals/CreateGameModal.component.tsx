import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './CreateGameModal.scss';
import { Modal } from './index';

export const CreateGameModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) => {
  const { t } = useTranslation();
  const [gameName, setGameName] = useState('');
  const [gamePassword, setGamePassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // DISPATCH ACTION HERE

    closeModal();
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="createGameModal-container">
        <form className="createGameModal-form" onSubmit={handleSubmit}>
          <p className="createGameModal-label">{t('pages.home.createGameModal.gameName')}</p>
          <input
            className="createGameModal-input"
            type="text"
            onChange={(e) => setGameName(e.target.value)}
          />
          <p className="createGameModal-label">{t('pages.home.createGameModal.gamePassword')}</p>
          <input
            className="createGameModal-input"
            type="text"
            onChange={(e) => setGamePassword(e.target.value)}
          />
          <input className="createGameModal-input" type="submit" />
        </form>
      </div>
    </Modal>
  );
};
