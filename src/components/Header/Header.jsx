import React from 'react';
import './Header.css';


import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ExploreIcon from '@mui/icons-material/Explore';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';

import avatar from '../../assets/avatar.jpg';

const Header = () => {
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
      <SettingsIcon style={{color: "#ffffff", transition: "0.25s ease"}} fontSize="large" className="navBarElement"/>
      <img src={avatar} alt="pfp" className="profilePic"></img>
      
      </div>
      
    
    </div>
  )
};

export default Header;
