import React from 'react';
import './MonitorButton.scss';

export const MonitorButton = ({
  children,
  className,
  type,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}) => (
  <button className={'monitor-button ' + className || ''} type={type} onClick={onClick}>
    {children}
  </button>
);
