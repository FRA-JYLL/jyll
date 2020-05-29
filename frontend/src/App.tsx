import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Signup from 'pages/Signup';
import Home from 'pages/Home';
import { RootState } from 'redux/root';
import {
  usernameSelector,
  getUserInfoActionCreator,
  accessTokenSelector,
} from 'redux/authentication';
import 'App.scss';

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
  return <div className="container">{username ? <Home /> : <Signup />}</div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
