import React from 'react';
import '../../components/ProfilePage/ProfilePage.css';
import { useNavigate } from 'react-router';

import { Container, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Divider } from '@mui/material';

import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ForumIcon from '@mui/icons-material/Forum';

const DisplayUser = ({ avatar, username, firstName, lastName }) => {
  const navigate = useNavigate();

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
        <Grid item sx={{ textAlign: 'center' }}>
          <img
            src={avatar}
            style={{
              objectFit: 'cover',
              width: '13em',
              height: '13em',
              borderRadius: '50%',
              backgroundColor: 'white',
            }}
            alt="profile pic"
          />
        </Grid>

        <Grid item sx={{ textAlign: 'center' }}>
          <Tooltip title="Click to see profile" placement="top">
            <button
              style={{ all: 'unset' }}
              onClick={() => navigate(`/profile/${username}`)}
            >
              <h3 style={{ cursor: 'pointer' }}>{username}</h3>
            </button>
          </Tooltip>
          <p style={{ fontStyle: 'italic' }}>
            <i>
              <VerifiedUserIcon sx={{ color: '#47DB00', fontSize: 'medium' }} />{' '}
            </i>
            Forum Member
          </p>

          <br />

          <Divider />
        </Grid>

        <Grid item sx={{ textAlign: 'center' }}>
          <p>
            {firstName} {lastName}
          </p>
        </Grid>
        <Grid item sx={{ textAlign: 'center' }}>
          <i>
            <SportsEsportsIcon />
            <ForumIcon />
          </i>
        </Grid>
      </Grid>
    </Container>
  );
};
export default DisplayUser;
