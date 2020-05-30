import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import AuthenticationPage from 'pages/AuthenticationPage';
import GameSelectionPage from 'pages/GameSelectionPage';
import './Navigator.scss';
import FullScreenLoader from 'components/loaders';
import { Props } from './Navigator.container';

const Navigator = ({ getUserInfo, username, accessToken }: Props) => {
  useEffect(() => {
    getUserInfo();
  }, [getUserInfo, accessToken]);

  const [signupIsVisible, setSignupIsVisible] = useState(false);

  return (
    <>
      <CSSTransition
        in={!username && !localStorage.accessToken}
        timeout={500}
        classNames={'authentication'}
        onEntering={() => setSignupIsVisible(true)}
        onExited={() => setSignupIsVisible(false)}
        mountOnEnter
        unmountOnExit
        appear
      >
        <AuthenticationPage />
      </CSSTransition>

      <CSSTransition
        in={!signupIsVisible && !!username}
        timeout={500}
        classNames={'game-selection'}
        mountOnEnter
        unmountOnExit
      >
        <GameSelectionPage />
      </CSSTransition>

      <CSSTransition
        in={!signupIsVisible && !username}
        timeout={500}
        classNames={'loader'}
        mountOnEnter
        unmountOnExit
      >
        <FullScreenLoader isVisible />
      </CSSTransition>
    </>
  );
};

export default Navigator;
