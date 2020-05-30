import React from 'react';
import './FullScreenLoader.scss';

const FullScreenLoader = () => (
  <div className={'full-screen-container'}>
    <img src={require('assets/loaders/factory-loader.gif')} alt={'Loading...'} width={150} />
  </div>
);

export default FullScreenLoader;
