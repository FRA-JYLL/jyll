import React from 'react';
import './Toast.scss';

const Toast = ({ message }: { message: string }) => (
  <div className={'toast-container'}>
    <div className={'toast-message'}>{message}</div>
  </div>
);

export default Toast;
