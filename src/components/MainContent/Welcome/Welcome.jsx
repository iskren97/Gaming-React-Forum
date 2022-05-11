import React, { useContext } from 'react';
import logo from './telerik.svg';
import './Welcome.css';
import LoginModal from '../../JoinCommunityModal/JoinModal';
import AppContext from '../../../providers/AppContext';
import { NavLink } from 'react-router-dom';

const Welcome = () => {
  const { user, userData } = useContext(AppContext);

  return (
    <div className="welcome-section">
      <div className="inner-welcome-section">
        <div className="media">
          {user ? (
            <div>
              <h1>Welcome,</h1>

              <NavLink to={`/profile/${userData.username}`}>
                <h2 className="user-username" data-replace={userData.username}>
                  <span>{userData.username}</span>
                </h2>
              </NavLink>
            </div>
          ) : (
            <div>
              <h1>Welcome to the forum!</h1>
              <a href="#/" className="join-button">
                <LoginModal />
              </a>
            </div>
          )}
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
