import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './CreateGameModal.scss';
import { Modal } from 'components/modals';
import { ContainerProps } from './CreateGameModal.container';
import { MonitorButton } from 'components/buttons/MonitorButton';

interface Props extends ContainerProps {
  isOpen: boolean;
  closeModal: () => void;
}

const CreateGameModal = ({ isOpen, closeModal, createGame }: Props) => {
  const { t } = useTranslation();

  const [gameName, setGameName] = useState('');
  const [gamePassword, setGamePassword] = useState('');

  const closeModalAndResetFields = () => {
    setGameName('');
    setGamePassword('');
    closeModal();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createGame(gameName || undefined, gamePassword || undefined);

    closeModalAndResetFields();
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModalAndResetFields}>
      <form className="createGameModal-form" onSubmit={handleSubmit}>
        <p className="createGameModal-label">{t('pages.gameSelection.createGameModal.gameName')}</p>
        <input
          className="createGameModal-input"
          type="text"
          onChange={(e) => setGameName(e.target.value)}
        />
        <p className="createGameModal-label">
          {t('pages.gameSelection.createGameModal.gamePassword')}
        </p>
        <input
          className="createGameModal-input"
          type="text"
          onChange={(e) => setGamePassword(e.target.value)}
        />
        <div className="createGameModal-button-container">
          <MonitorButton type="button" onClick={closeModalAndResetFields}>
            {t('pages.gameSelection.createGameModal.cancel')}
          </MonitorButton>
          <MonitorButton type="submit">
            {t('pages.gameSelection.createGameModal.submit')}
          </MonitorButton>
        </div>
      </form>
    </Modal>
  );
};

export default CreateGameModal;
