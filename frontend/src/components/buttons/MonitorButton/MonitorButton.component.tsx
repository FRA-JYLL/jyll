import React from 'react';
import './MonitorButton.scss';

export const MonitorButton = ({
  children,
  className,
  type,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
}) => (
  <button
    className={(disabled ? 'disabled ' : '') + 'monitor-button ' + className || ''}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);
