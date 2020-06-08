import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import AuthenticationPage from 'pages/AuthenticationPage';
import GameSelectionPage from 'pages/GameSelectionPage';
import './Navigator.scss';
import FullScreenLoader from 'components/loaders';
import Toast from 'components/toast';
import { NavigationPage } from 'redux/navigation';
import { Props } from './Navigator.container';
import GameRoomPage from 'pages/GameRoomPage';
import GamePage from 'pages/GamePage';

const Navigator = ({
  getUserInfo,
  showNextPage,
  accessToken,
  nextPage,
  currentPage,
  showToast,
  toastMessage,
}: Props) => {
  useEffect(() => {
    getUserInfo();
  }, [getUserInfo, accessToken]);

  return (
    <>
      <CSSTransition
        in={currentPage === NavigationPage.Authentication && nextPage === undefined}
        timeout={500}
        classNames={'authentication'}
        onExited={showNextPage}
        mountOnEnter
        unmountOnExit
      >
        <AuthenticationPage />
      </CSSTransition>

      <CSSTransition
        in={currentPage === NavigationPage.GameSelection && nextPage === undefined}
        timeout={500}
        classNames={'game-selection'}
        onExited={showNextPage}
        mountOnEnter
        unmountOnExit
      >
        <GameSelectionPage />
      </CSSTransition>

      <CSSTransition
        in={currentPage === NavigationPage.GameRoom && nextPage === undefined}
        timeout={500}
        classNames={'game-room'}
        onExited={showNextPage}
        mountOnEnter
        unmountOnExit
      >
        <GameRoomPage />
      </CSSTransition>

      <CSSTransition
        in={currentPage === NavigationPage.Game && nextPage === undefined}
        timeout={500}
        classNames={'game-page'}
        onExited={showNextPage}
        mountOnEnter
        unmountOnExit
      >
        <GamePage />
      </CSSTransition>

      <CSSTransition
        in={
          (currentPage === NavigationPage.FirstLoader || currentPage === NavigationPage.Loader) &&
          nextPage === undefined
        }
        timeout={{ enter: 300, exit: 100 }}
        classNames={'loader'}
        onExited={showNextPage}
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
