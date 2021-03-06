import Container from '@mui/material/Container';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Items from './Items';

import generalLogo from '../../icons/general.png';
import shooterLogo from '../../icons/sniper.png';
import mmoLogo from '../../icons/mmo.png';
import rtsLogo from '../../icons/rts.png';
import adventureLogo from '../../icons/adventure.png';

import desktopLogo from '../../icons/desktop.png';
import mouseLogo from '../../icons/mouse.png';

import tournamentLogo from '../../icons/tournament.png';
import streamLogo from '../../icons/stream.png';
import entLogo from '../../icons/ent.png';
import { NavLink } from 'react-router-dom';

const Categories = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        height: 'auto',
        backgroundColor: 'white',
        boxShadow: '0 1px 6px rgba(0,0,0,0.2)',
        marginTop: '50px',
        paddingBottom: '55px'
      }}>
      <Grid container spacing={2} direction="column" className="category-container">
        <Grid item>
          <h1>Gaming discussions:</h1>
        </Grid>

        <Grid item>
          <NavLink to="/general_discussion">
            <Items name="General Discussion" topic="games" logo={generalLogo} />
          </NavLink>
        </Grid>

        <Grid item>
          <NavLink to="/shooters">
            <Items name="Shooters" topic="shooting games" logo={shooterLogo} />
          </NavLink>
        </Grid>

        <Grid item>
          <NavLink to="/mmorpg">
            <Items name="MMORPG" topic="MMORPGs" logo={mmoLogo} />
          </NavLink>
        </Grid>

        <Grid item>
          <NavLink to="/rts">
            <Items name="RTS" topic="real time strategy games" logo={rtsLogo} />
          </NavLink>
        </Grid>

        <Grid item>
          <NavLink to="/adventure">
            <Items name="Adventure" topic="adventure games" logo={adventureLogo} />
          </NavLink>
        </Grid>

        <Grid item>
          <h1>Computer hardware:</h1>
        </Grid>

        <Grid item>
          <NavLink to="/gaming_pc">
            <Items name="Gaming Laptops and PCs" topic="gaming machines" logo={desktopLogo} />
          </NavLink>
        </Grid>

        <Grid item>
          <NavLink to="/gaming_accessories">
            <Items name="Gaming Accessories" topic="gaming accessories" logo={mouseLogo} />
          </NavLink>
        </Grid>

        <Grid item>
          <h1>Community:</h1>
        </Grid>

        <Grid item>
          <NavLink to="/tournaments">
            <Items
              name="Tournaments"
              topic="popular gaming events and tournaments"
              logo={tournamentLogo}
            />
          </NavLink>
        </Grid>

        <Grid item>
          <NavLink to="/streaming">
            <Items name="Streaming" topic="your favorite streamers" logo={streamLogo} />
          </NavLink>
        </Grid>

        <Grid item>
          <NavLink to="/entertainment">
            <Items
              name="Entertainment"
              topic="your favorite sources of entertainment"
              logo={entLogo}
            />
          </NavLink>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Categories;
