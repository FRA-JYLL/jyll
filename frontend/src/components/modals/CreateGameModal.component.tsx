import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './CreateGameModal.scss';
import { Modal } from './index';
import { ContainerProps } from './CreateGameModal.container';

interface Props extends ContainerProps {
  isOpen: boolean;
  closeModal: () => void;
}

const CreateGameModal = ({ isOpen, closeModal, createGame }: Props) => {
  const { t } = useTranslation();
  const [gameName, setGameName] = useState('');
  const [gamePassword, setGamePassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createGame(gameName, gamePassword);

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
          <div className="createGameModal-button-container">
            <button className="createGameModal-button" onClick={closeModal}>
              {t('pages.home.createGameModal.cancel')}
            </button>
            <button className="createGameModal-button" type="submit">
              {t('pages.home.createGameModal.submit')}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateGameModal;
