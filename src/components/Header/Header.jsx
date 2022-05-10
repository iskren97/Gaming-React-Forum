import React from 'react';
import './Header.css';
import { useState, useContext } from 'react';

import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ExploreIcon from '@mui/icons-material/Explore';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import avatar from '../../assets/avatar.jpg';

import AppContext from '../../providers/AppContext';

import { loginUser } from '../../services/auth.service';
import { logoutUser } from '../../services/auth.service';
import { getUserData } from '../../services/users.service';
import Alert from '@mui/material/Alert';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Tooltip } from '@mui/material';
import DropDown from '../NewTopicModal/DropDown';

import swal from 'sweetalert';

const Header = ({ loading }) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [invalidLogin, setInvalidLogin] = useState(false);
  const open = Boolean(anchorEl);

  const [isTopicVisible, setTopicVisibility] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { user, userData, setContext } = useContext(AppContext);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const updateForm = (prop) => (e) => {
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  const handleWrongPassword = () => {
    setInvalidLogin(true);
  };

  const login = (e) => {
    e.preventDefault();

    loginUser(form.email, form.password)
      .then((u) => {
        return getUserData(u.user.uid).then((snapshot) => {
          if (snapshot.exists()) {
            setContext({
              user: u.user.email,
              userData: snapshot.val()[Object.keys(snapshot.val())[0]],
            });
          }
        });
      })
      .catch(() => {
        handleWrongPassword();
      });
  };

  const handleKeyEnter = (event) => {
    if (event.key === 'Enter') {
      if (invalidLogin === true) {
        setInvalidLogin(false);
      } else {
        login(event);
      }
    }
  };

  const logout = () => {
    logoutUser().then(() => {
      setContext({ user: null, userData: null });

      navigate('/');
    });
  };

  return (
    <>
      {invalidLogin ? (
        <ClickAwayListener onClickAway={() => setInvalidLogin(false)}>
          <Alert
            className="alertButton"
            onClose={() => setInvalidLogin(false)}
            severity="error"
            sx={{
              position: 'fixed',
              zIndex: '3',
              top: '12vh',
              width: '30vw',
              marginLeft: '35vw',
              boxShadow: '0px 4px 24px 3px rgb(0 0 0)',
              alignItems: 'center',
            }}
            variant="filled"
          >
            Incorrect email or password
          </Alert>
        </ClickAwayListener>
      ) : null}

      <div className="container">
        <div className="buttonsContainer">
          <Tooltip title="Home page">
            <NavLink to="/">
              <HomeIcon
                style={{ color: '#ffffff', transition: '0.25s ease' }}
                fontSize="large"
                className="navBarElement"
              />
            </NavLink>
          </Tooltip>

          <NavLink to="/users">
            <Tooltip title="See all users">
              <PeopleIcon
                style={{ color: '#ffffff', transition: '0.25s ease' }}
                fontSize="large"
                className="navBarElement"
              />
            </Tooltip>
          </NavLink>

          <button
            style={{ background: 'none', border: 'none' }}
            onClick={() => setTopicVisibility(true)}
          >
            <Tooltip title="New topic">
              <LibraryAddIcon
                style={{ color: '#ffffff', transition: '0.25s ease' }}
                fontSize="large"
                className="navBarElement"
              />
            </Tooltip>
          </button>

          <NavLink to="/all_posts">
            <Tooltip title="See all posts">
              <ExploreIcon
                style={{ color: '#ffffff', transition: '0.25s ease' }}
                fontSize="large"
                className="navBarElement"
              />
            </Tooltip>
          </NavLink>

          <StarIcon
            style={{ color: '#ffffff', transition: '0.25s ease' }}
            fontSize="large"
            className="navBarElement"
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <SearchIcon
            style={{ position: 'relative', left: '10%', color: '#ffffff' }}
            fontSize="large"
          />

          <input
            type="text"
            placeholder="Search anything..."
            className="searchBox"
          />
        </div>

        {loading ? (
          <div className="lds-dual-ring"></div>
        ) : user ? (
          <div className="elementsContainer">
            <h3 className="userNameStyle">{userData?.username}</h3>

            <Tooltip title="Profile">
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                {/* <Avatar onClick={handleClick} sx={{ width: 48, height: 48 }}>
                <img src={avatar} alt="pfp" className="profilePic"></img>
              </Avatar> */}

                {userData.avatarUrl ? (
                  <Avatar onClick={handleClick} sx={{ width: 48, height: 48 }}>
                    <img
                      src={userData.avatarUrl}
                      className="profilePic"
                      alt="profile"
                    />
                  </Avatar>
                ) : (
                  <Avatar onClick={handleClick} sx={{ width: 48, height: 48 }}>
                    <img src={avatar} className="profilePic" alt="profile" />
                  </Avatar>
                )}
              </Box>
            </Tooltip>

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },

                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              {/* <NavLink to="/MyProfile"> */}
              <MenuItem
                onClick={() => navigate(`/profile/${userData.username}`)}
                sx={{ bgcolor: 'white' }}
              >
                <ListItemIcon>
                  <AccountCircleIcon fontSize="medium" />
                </ListItemIcon>
                My Profile
              </MenuItem>
              {/* </NavLink> */}
              <Divider />
              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <Logout fontSize="medium" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <div className="loginContainer">
            <input
              onKeyDown={handleKeyEnter}
              className="inputField"
              type="email"
              id="email"
              placeholder="Email"
              value={form.email}
              onChange={updateForm('email')}
            ></input>

            <br />

            <input
              onKeyDown={handleKeyEnter}
              className="inputField"
              type="password"
              id="password"
              placeholder="Password"
              value={form.password}
              onChange={updateForm('password')}
            ></input>

            <br />
            <br />

            <Button
              onClick={login}
              variant="contained"
              style={{ background: '#47DB00' }}
            >
              Login
            </Button>
          </div>
        )}
      </div>
      {isTopicVisible ? (
        <DropDown test={isTopicVisible} set={setTopicVisibility} />
      ) : null}
    </>
  );
};

export default Header;
