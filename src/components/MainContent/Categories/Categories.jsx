import Container from '@mui/material/Container';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Items from './Items';

import generalLogo from '../../icons/general.png';
import shooterLogo from '../../icons/sniper.png';
import mmoLogo from '../../icons/mmo.png';
import adventureLogo from '../../icons/adventure.png';

import desktopLogo from '../../icons/desktop.png';
import mouseLogo from '../../icons/mouse.png';

import tournamentLogo from '../../icons/tournament.png';
import streamLogo from '../../icons/stream.png';
import entLogo from '../../icons/ent.png';

const Categories = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        height: 'auto',
        backgroundColor: 'white',
        boxShadow: '0 1px 6px rgba(0,0,0,0.2)',
        marginTop: '50px',
        paddingBottom: '55px',
      }}
    >
      <Grid container spacing={2} direction="column">
        <Grid item xs={12}>
          <h1>Gaming discussions:</h1>
        </Grid>

        <Grid item xs={4}>
          <a href="/general_discussion">
            <Items name="General Discussion" topic="games" logo={generalLogo} />
          </a>
        </Grid>

        <Grid item xs={6}>
          <a href="/shooters">
            <Items name="Shooters" topic="shooting games" logo={shooterLogo} />
          </a>
        </Grid>

        <Grid item xs={6}>
          <a href="/mmorpg">
            <Items name="MMORPG" topic="MMORPGs" logo={mmoLogo} />
          </a>
        </Grid>

        <Grid item xs={6}>
          <a href="/adventure">
            <Items
              name="Adventure"
              topic="adventure games"
              logo={adventureLogo}
            />
          </a>
        </Grid>

        <Grid item xs={12}>
          <h1>Computer hardware:</h1>
        </Grid>

        <Grid item xs={6}>
          <a href="/gaming_pc">
            <Items
              name="Gaming Laptops and PCs"
              topic="gaming machines"
              logo={desktopLogo}
            />
          </a>
        </Grid>

        <Grid item xs={6}>
          <a href="/gaming_accessories">
            <Items
              name="Gaming Accessories"
              topic="gaming accessories"
              logo={mouseLogo}
            />
          </a>
        </Grid>

        <Grid item xs={12}>
          <h1>Community:</h1>
        </Grid>

        <Grid item xs={6}>
          <a href="/tournaments">
            <Items
              name="Tournaments"
              topic="popular gaming events and tournaments"
              logo={tournamentLogo}
            />
          </a>
        </Grid>

        <Grid item xs={6}>
          <a href="/streaming">
            <Items
              name="Streaming"
              topic="your favorite streamers"
              logo={streamLogo}
            />
          </a>
        </Grid>

        <Grid item xs={6}>
          <a href="/entertainment">
            <Items
              name="Entertainment"
              topic="your favorite sources of entertainment"
              logo={entLogo}
            />
          </a>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Categories;
