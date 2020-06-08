import React from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import './GamePage.scss';
import { Props } from './GamePage.container';

interface ComponentProps extends Props {
  transitionIn: boolean;
  transitionOnExited: () => void;
}

const GamePage = ({ transitionIn, transitionOnExited }: ComponentProps) => {
  const { t } = useTranslation();

  return (
    <div className="game-container">
      <CSSTransition
        in={transitionIn}
        timeout={500}
        classNames={'transition-left'}
        onExited={transitionOnExited}
        mountOnEnter
        unmountOnExit
      >
        <div className="screen buildings-panel">buildings</div>
      </CSSTransition>

      <CSSTransition
        in={transitionIn}
        timeout={500}
        classNames={'transition-top'}
        mountOnEnter
        unmountOnExit
      >
        <div className="top-menu-container">
          <div className="screen top-menu">menu</div>
        </div>
      </CSSTransition>

      <CSSTransition
        in={transitionIn}
        timeout={500}
        classNames={'transition-center'}
        mountOnEnter
        unmountOnExit
      >
        <div className="map">
          <img
            src={require('assets/game-elements/floating-island.png')}
            alt={'Floating island background'}
            height={'90%'}
          />
        </div>
      </CSSTransition>

      <CSSTransition
        in={transitionIn}
        timeout={500}
        classNames={'transition-bottom'}
        mountOnEnter
        unmountOnExit
      >
        <div className="screen logs-container">
          <div className="logs-panel">logs</div>
          <div className="undo-buttons">undo / redo</div>
        </div>
      </CSSTransition>

      <CSSTransition
        in={transitionIn}
        timeout={500}
        classNames={'transition-bottom-right'}
        mountOnEnter
        unmountOnExit
      >
        <div className="end-container">
          <div className="screen end-button">end</div>
        </div>
      </CSSTransition>

      <CSSTransition
        in={transitionIn}
        timeout={500}
        classNames={'transition-right'}
        mountOnEnter
        unmountOnExit
      >
        <div className="screen stats-panel">stats</div>
      </CSSTransition>
    </div>
  );
};

export default GamePage;
