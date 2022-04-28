import React from 'react';
import logo from './telerik.svg';
import './Welcome.css';
import LoginModal from '../../JoinCommunityModal/JoinModal';

const Welcome = () => {
  return (
    <div className="welcome-section">
      <div className="inner-welcome-section">
        <div className="media">
          <h1>Welcome to the forum!</h1>
          <a className="join-button">
            <LoginModal />
          </a>
        </div>
      </div>

      <div className="inner-welcome-section">
        <div className="telerik-name-logo">
          <p>Powered by:</p>
          <a
            href="https://www.telerikacademy.com/"
            target="_blank"
            rel="noreferrer"
          >
            <img className="telerik-logo" src={logo} alt="telerik logo"></img>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
