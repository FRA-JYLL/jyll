import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './JoinGameModal.scss';
import { Modal } from 'components/modals';

export const JoinGameModal = ({
  isOpen,
  closeModal,
  onSubmit,
}: {
  isOpen: boolean;
  closeModal: () => void;
  onSubmit: (password?: string) => void;
}) => {
  const { t } = useTranslation();

  const [gamePassword, setGamePassword] = useState('');

  const closeModalAndResetFields = () => {
    setGamePassword('');
    closeModal();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(gamePassword || undefined);

    closeModalAndResetFields();
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModalAndResetFields}>
      <form className="joinGameModal-form" onSubmit={handleSubmit}>
        <p className="joinGameModal-label">{t('pages.gameSelection.joinGameModal.gamePassword')}</p>
        <input
          className="joinGameModal-input"
          type="text"
          onChange={(e) => setGamePassword(e.target.value)}
        />
        <div className="joinGameModal-button-container">
          <button
            className="joinGameModal-button"
            type={'button'}
            onClick={closeModalAndResetFields}
          >
            {t('pages.gameSelection.joinGameModal.cancel')}
          </button>
          <button className="joinGameModal-button" type="submit">
            {t('pages.gameSelection.joinGameModal.submit')}
          </button>
        </div>
      </form>
    </Modal>
  );
};
