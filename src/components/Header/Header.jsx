import React from 'react';
import './Header.css';
import { useState } from 'react'

import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ExploreIcon from '@mui/icons-material/Explore';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';


import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';


import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import avatar from '../../assets/avatar.jpg';

const Header = () => {
  //DropDownProfile logic
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <div className="container">
      <div className="buttonsContainer">
      <HomeIcon style={{color: "#ffffff", transition: "0.25s ease"}} fontSize="large" className="navBarElement"/>
      <PeopleIcon style={{color: "#ffffff", transition: "0.25s ease"}} fontSize="large" className="navBarElement"/>
      <LibraryAddIcon style={{color: "#ffffff", transition: "0.25s ease"}} fontSize="large" className="navBarElement"/>
      <ExploreIcon style={{color: "#ffffff", transition: "0.25s ease"}} fontSize="large" className="navBarElement"/>
      <StarIcon style={{color: "#ffffff", transition: "0.25s ease"}} fontSize="large" className="navBarElement"/>

      </div>
  

      <div style= {{display: "flex", flexDirection: "row", alignItems: "center"}}>
      <SearchIcon style={{position: "relative",left: "10%", color: "#ffffff" }} fontSize="large"/>
      <input type="text" placeholder="Search anything..." className="searchBox"/>
      </div>
      
     
         
     

      
      <div className="elementsContainer">
      <h3 className="userNameStyle">TestUser123</h3>
      
      
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          
            <Avatar onClick={handleClick} sx={{ width: 48, height: 48, }}><img src={avatar} alt="pfp" className="profilePic"></img></Avatar>
         
      </Box>
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
    
        <MenuItem sx={{bgcolor: 'white'}}>
        <ListItemIcon>
        <AccountCircleIcon fontSize="medium"/>
          </ListItemIcon>
          My Profile
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="medium" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>



      </div>
      
    
    </div>
  )
};

export default Header;
