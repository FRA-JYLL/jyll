import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './Modal.scss';

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
      timeout={{ enter: 500, exit: 200 }}
      classNames={'modal'}
      onExited={onClosed}
      mountOnEnter
      unmountOnExit
    >
      <div className="modal-container">{children}</div>
    </CSSTransition>
    <CSSTransition
      in={isOpen}
      timeout={{ enter: 500, exit: 200 }}
      classNames={'modal'}
      mountOnEnter
      unmountOnExit
    >
      <div className="modal-overlay" onClick={closeModal}></div>
    </CSSTransition>
  </>
);
