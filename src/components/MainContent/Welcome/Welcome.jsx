import React from 'react';
import logo from './telerik.svg';
import './Welcome.css';

const Welcome = () => {
  return (
    <div className="welcome-section">
      <div className="inner-welcome-section">
        <div className="media">
          <h1>Welcome to the forum!</h1>
          <a className="join-button">Join the community</a>
        </div>
      </div>

      <div className="telerik-section">
        <div className="telerik-name-logo">
          <p>Powered by:</p>
          <img className="telerik-logo" src={logo} alt="telerik logo"></img>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
