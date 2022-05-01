import React from 'react';
import './Profile.css';

import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Divider } from '@mui/material';
import profileImg from './imgs/iskren.JPG';

import SchoolIcon from '@mui/icons-material/School';

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Profile = () => {
  return (
    <Container
      className="profile-container"
      maxWidth="xs"
      sx={{
        width: 300,
        height: 'auto',
        backgroundColor: 'white',
        boxShadow: '0 1px 6px rgba(0,0,0,0.2)',
        paddingBottom: '16px',
        paddingTop: '16px',
      }}
    >
      <Grid container spacing={2} direction="column">
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <img
            src={profileImg}
            style={{ width: '160px', height: '160px', objectFit: 'cover' }}
            alt="profile-pic"
          />
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <h3>Iskren Gyorev</h3>
          <p style={{ fontStyle: 'italic' }}>
            <SchoolIcon sx={{ color: '#47DB00', fontSize: 'medium' }} /> Telerik
            Academy student
          </p>
          <p style={{ marginTop: '15px' }}>About</p>
          <Divider />
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <p>24 years old</p>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <a
            href="https://www.google.com/maps/place/%D0%92%D0%B8%D0%B4%D0%B8%D0%BD/@43.9796191,22.8423547,13z/data=!3m1!4b1!4m5!3m4!1s0x475379eca2009025:0x1f853ae2f877d8b7!8m2!3d43.996159!4d22.8679302"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <LocationOnIcon /> Vidin, Bulgaria
          </a>
        </Grid>
        <Grid item textAlign="center">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <InstagramIcon />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <FacebookIcon />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <LinkedInIcon />
          </a>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
