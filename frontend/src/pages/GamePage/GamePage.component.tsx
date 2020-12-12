import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import ReactTooltip from 'react-tooltip';
import './GamePage.scss';
import { Props } from './GamePage.container';
import { Monitor } from 'components/monitor';
import { MonitorButton } from 'components/buttons/MonitorButton';
import { BuildingAction, PlayerBuilding, PlayerRatings, PlayerResources } from 'redux/game/types';

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
  endTurnData,
  buildingsBalance,
  updateBuildingsBalance,
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

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const buildingButtons = fullPlayer?.buildings.map((building: PlayerBuilding) => {
    const formattedBuildingJSON = JSON.stringify(building)
      .split(',')
      .join(',<br>')
      .split('{')
      .join('{<br>')
      .split('}')
      .join('<br>}')
      .split(':')
      .join(': ')
      .split('"')
      .join('');
    const addOne = () => updateBuildingsBalance(building.classIndex, 1);
    const removeOne = () => updateBuildingsBalance(building.classIndex, -1);
    return (
      <div className="building-item-container">
        <p data-tip={formattedBuildingJSON}>
          <MonitorButton className="building-picture" data-tip={formattedBuildingJSON}>
            {building.classIndex}
          </MonitorButton>
        </p>

        <div className="building-modifiers-container">
          <MonitorButton
            className="building-modifier-button"
            onClick={addOne}
            disabled={
              building.copies + (buildingsBalance[building.classIndex] || 0) >= building.quantityCap
            }
          >
            +
          </MonitorButton>

          <MonitorButton
            className="building-modifier-button"
            onClick={removeOne}
            disabled={building.copies + (buildingsBalance[building.classIndex] || 0) <= 0}
          >
            -
          </MonitorButton>
        </div>
      </div>
    );
  });

  const logEntries = endTurnData.buildingActions.map((buildingAction: BuildingAction) => (
    <div className="logs-item">
      <p>{'Building n°' + buildingAction.classIndex}</p>
      <p>{buildingAction.type + ' ' + buildingAction.copies}</p>
    </div>
  ));

  const playerRatings = (ratings: PlayerRatings | undefined) =>
    ratings && (
      <>
        <p>{'Economy: ' + ratings.economy}</p>
        <p>{'Society: ' + ratings.society}</p>
        <p>{'Environment: ' + ratings.environment}</p>
      </>
    );

  const playerResources = (resources: PlayerResources | undefined) =>
    resources && (
      <>
        <p>{'Hydrocarbon: ' + resources.hydrocarbon}</p>
        <p>{'Money: ' + resources.money}</p>
      </>
    );

  return (
    <>
      <CSSTransition in={transitionIn} timeout={0} mountOnEnter unmountOnExit>
        <ReactTooltip multiline place="right" />
      </CSSTransition>

      <div className="game-container">
        <CSSTransition
          in={transitionIn}
          timeout={500}
          classNames={'transition-left'}
          onExited={transitionOnExited}
          mountOnEnter
          unmountOnExit
        >
          <Monitor className="buildings-panel">{buildingButtons}</Monitor>
        </CSSTransition>

        <CSSTransition
          in={transitionIn}
          timeout={500}
          classNames={'transition-top'}
          mountOnEnter
          unmountOnExit
        >
          <div className="top-menu-container">
            <Monitor className="top-menu">
              {<p>menu</p>}
              {<p data-tip="About the menu">(i)</p>}
            </Monitor>
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
            <p>Your actions:</p>
            {logEntries}
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
          <Monitor className="stats-panel">
            <p data-tip="The current state of your country">Player stats</p>
            <br />
            {playerRatings(fullPlayer?.ratings)}
            <br />
            {playerResources(fullPlayer?.resources)}
          </Monitor>
        </CSSTransition>
      </div>
    </>
  );
};

export default GamePage;
