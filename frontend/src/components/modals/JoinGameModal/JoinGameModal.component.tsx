import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './JoinGameModal.scss';
import { Modal } from 'components/modals';
import { MonitorButton } from 'components/buttons/MonitorButton';

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
          <MonitorButton type={'button'} onClick={closeModalAndResetFields}>
            {t('pages.gameSelection.joinGameModal.cancel')}
          </MonitorButton>
          <MonitorButton type="submit">
            {t('pages.gameSelection.joinGameModal.submit')}
          </MonitorButton>
        </div>
      </form>
    </Modal>
  );
};
