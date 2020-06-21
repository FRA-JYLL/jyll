import React from 'react';
import './Monitor.scss';

export const Monitor = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={'screen ' + className}>{children}</div>;
