import React from 'react';
import './FullScreenLoader.scss';

const FullScreenLoader = ({ isVisible }: { isVisible: boolean }) =>
  isVisible ? (
    <div className={'full-screen-container'}>
      <img src={require('assets/loaders/factory-loader.gif')} alt={'Loading...'} width={150} />
    </div>
  ) : null;

export default FullScreenLoader;
