import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import AuthenticationPage from 'pages/AuthenticationPage';
import GameSelectionPage from 'pages/GameSelectionPage';
import './Navigator.scss';
import FullScreenLoader from 'components/loaders';
import Toast from 'components/toast';
import { Props } from './Navigator.container';

const Navigator = ({
  getUserInfo,
  username,
  accessToken,
  showMainLoader,
  showToast,
  toastMessage,
}: Props) => {
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
        in={showMainLoader && !signupIsVisible}
        timeout={{ enter: 300, exit: 100 }}
        classNames={'loader'}
        mountOnEnter
        unmountOnExit
      >
        <FullScreenLoader />
      </CSSTransition>

      <CSSTransition in={showToast} timeout={500} classNames={'toast'} mountOnEnter unmountOnExit>
        <Toast message={toastMessage} />
      </CSSTransition>
    </>
  );
};

export default Navigator;
