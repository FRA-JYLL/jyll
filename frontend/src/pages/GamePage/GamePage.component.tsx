import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import './GamePage.scss';
import { Props } from './GamePage.container';
import { Monitor } from 'components/monitor';
import { MonitorButton } from 'components/buttons/MonitorButton';

interface ComponentProps extends Props {
  transitionIn: boolean;
  transitionOnExited: () => void;
}

const GamePage = ({
  transitionIn,
  transitionOnExited,
  endTurn,
  getFullPlayer,
  fullPlayer,
}: ComponentProps) => {
  const { t } = useTranslation();

  const refreshPeriod = 2000;
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    const setTimeoutId = setTimeout(() => setTimer(timer + 1), refreshPeriod);
    return () => clearTimeout(setTimeoutId);
  }, [timer]);

  useEffect(() => {
    getFullPlayer();
  }, [getFullPlayer, timer]);

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
        <Monitor className="buildings-panel">buildings</Monitor>
      </CSSTransition>

      <CSSTransition
        in={transitionIn}
        timeout={500}
        classNames={'transition-top'}
        mountOnEnter
        unmountOnExit
      >
        <div className="top-menu-container">
          <Monitor className="top-menu">menu</Monitor>
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
        <Monitor className="logs-container">
          <div className="logs-panel">logs</div>
          <div className="undo-buttons">undo / redo</div>
        </Monitor>
      </CSSTransition>

      <CSSTransition
        in={transitionIn}
        timeout={500}
        classNames={'transition-bottom-right'}
        mountOnEnter
        unmountOnExit
      >
        <div className="end-container">
          <Monitor className="end-button">
            <MonitorButton onClick={endTurn} disabled={fullPlayer?.isReady}>
              {fullPlayer?.isReady ? t('game.ui.waiting') : t('game.ui.endTurn')}
            </MonitorButton>
          </Monitor>
        </div>
      </CSSTransition>

      <CSSTransition
        in={transitionIn}
        timeout={500}
        classNames={'transition-right'}
        mountOnEnter
        unmountOnExit
      >
        <Monitor className="stats-panel">stats</Monitor>
      </CSSTransition>
    </div>
  );
};

export default GamePage;
