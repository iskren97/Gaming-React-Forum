import React, { useContext } from 'react';
import logo from './telerik.svg';
import './Welcome.css';
import LoginModal from '../../JoinCommunityModal/JoinModal';
import AppContext from '../../../providers/AppContext';
import { NavLink } from 'react-router-dom';
import { Tooltip } from '@mui/material';

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
                <Tooltip title="Open profile">
                  <h2
                    className="user-username"
                    data-replace={userData.firstName + ' ' + userData.lastName}>
                    <span>
                      {userData.firstName} {userData.lastName}
                    </span>
                  </h2>
                </Tooltip>
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
          <a href="https://www.telerikacademy.com/" target="_blank" rel="noreferrer">
            <img className="telerik-logo" src={logo} alt="telerik logo"></img>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
