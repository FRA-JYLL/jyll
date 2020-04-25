import React, { useState } from 'react';
import Signup from 'pages/Signup';
import Home from 'pages/Home';
import 'App.scss';

const App = () => {
  const [shouldShowSignup, setShouldShowSignup] = useState(!localStorage.access);

  return (
    <div className="container">
      {shouldShowSignup ? <Signup setShouldShowSignup={setShouldShowSignup} /> : <Home />}
    </div>
  );
};

export default App;
