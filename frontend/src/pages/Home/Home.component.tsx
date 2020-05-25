import React from 'react';
import { LoginState } from 'redux/Login';
import './Home.scss';

const Home = ({ username }: { username: LoginState['username'] }) => (
  <div className="home-container">
    <h1 className="home-title">{`${
      username ? `Welcome ${username}!` : ''
    } You finally logged in.`}</h1>
    <p className="home-subtitle">You good turtle.</p>
    <p className="home-text">Now enjoy staring at a blank page \(°-° )/</p>
    <button
      onClick={() => {
        localStorage.clear();
        window.location.reload();
      }}
    >
      Clear localStorage
    </button>
  </div>
);

export default Home;
