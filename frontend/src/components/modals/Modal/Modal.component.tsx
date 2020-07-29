import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './Modal.scss';
import { Monitor } from 'components/monitor';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  onClosed?: () => void;
}

export const Modal = ({
  isOpen,
  closeModal,
  onClosed,
  children,
}: React.PropsWithChildren<Props>) => (
  <>
    <CSSTransition
      in={isOpen}
      timeout={500}
      classNames={'modal'}
      onExited={onClosed}
      mountOnEnter
      unmountOnExit
    >
      <Monitor className="modal">{children}</Monitor>
    </CSSTransition>
    <CSSTransition in={isOpen} timeout={500} classNames={'overlay'} mountOnEnter unmountOnExit>
      <div className="overlay" onClick={closeModal}></div>
    </CSSTransition>
  </>
);
