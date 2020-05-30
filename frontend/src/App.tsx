import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import Signup from 'pages/Signup';
import Home from 'pages/Home';
import { RootState } from 'redux/root';
import {
  usernameSelector,
  getUserInfoActionCreator,
  accessTokenSelector,
} from 'redux/authentication';
import 'App.scss';
import FullScreenLoader from 'components/loaders';

const mapStateToProps = (state: RootState) => {
  return {
    username: usernameSelector(state),
    accessToken: accessTokenSelector(state),
  };
};

const mapDispatchToProps = {
  getUserInfo: getUserInfoActionCreator,
};

type AppProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const App = ({ getUserInfo, username, accessToken }: AppProps) => {
  useEffect(() => {
    getUserInfo();
  }, [getUserInfo, accessToken]);

  const [signupIsVisible, setSignupIsVisible] = useState(false);

  return (
    <div className="container">
      <CSSTransition
        in={!username && !localStorage.accessToken}
        timeout={500}
        classNames={'signup'}
        onEntering={() => setSignupIsVisible(true)}
        onExited={() => setSignupIsVisible(false)}
        mountOnEnter
        unmountOnExit
        appear
      >
        <Signup />
      </CSSTransition>

      <CSSTransition
        in={!signupIsVisible && !!username}
        timeout={500}
        classNames={'home'}
        mountOnEnter
        unmountOnExit
      >
        <Home />
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
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
