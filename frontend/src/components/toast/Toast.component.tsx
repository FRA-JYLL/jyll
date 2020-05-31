import React from 'react';
import { useTranslation } from 'react-i18next';
import './Toast.scss';

const Toast = ({ message }: { message: string }) => {
  const { t } = useTranslation();

  return (
    <div className={'toast-container'}>
      <div className={'toast-message'}>{t(`toast.${message}`)}</div>
    </div>
  );
};
export default Toast;
