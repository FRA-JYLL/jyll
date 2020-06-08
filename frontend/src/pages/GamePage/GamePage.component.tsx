import React from 'react';
import { useTranslation } from 'react-i18next';
import './GamePage.scss';

const GamePage = () => {
  const { t } = useTranslation();

  return (
    <div className="game-container">
      <div className="screen buildings-panel">buildings</div>
      <div className="top-menu-container">
        <div className="screen top-menu">menu</div>
      </div>
      <div className="map">
        <img
          src={require('assets/game-elements/floating-island.png')}
          alt={'Floating island background'}
          height={'90%'}
        />
      </div>
      <div className="screen logs-container">
        <div className="logs-panel">logs</div>
        <div className="undo-buttons">undo / redo</div>
      </div>
      <div className="screen stats-panel">stats</div>
      <div className="end-container">
        <div className="screen end-button">end</div>
      </div>
    </div>
  );
};

export default GamePage;
