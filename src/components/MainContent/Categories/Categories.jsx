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
          <Items name="General Discussion" topic="games" logo={generalLogo} />
        </Grid>
        <Grid item xs={6}>
          <Items name="Shooters" topic="shooting games" logo={shooterLogo} />
        </Grid>
        <Grid item xs={6}>
          <Items name="MMORPG" topic="MMORPGs" logo={mmoLogo} />
        </Grid>

        <Grid item xs={6}>
          <Items
            name="Adventure"
            topic="adventure games"
            logo={adventureLogo}
          />
        </Grid>

        <Grid item xs={12}>
          <h1>Computer hardware:</h1>
        </Grid>

        <Grid item xs={6}>
          <Items
            name="Gaming Laptops and PCs"
            topic="gaming machines"
            logo={desktopLogo}
          />
        </Grid>
        <Grid item xs={6}>
          <Items
            name="Gaming Accessories"
            topic="gaming accessories"
            logo={mouseLogo}
          />
        </Grid>

        <Grid item xs={12}>
          <h1>Community:</h1>
        </Grid>

        <Grid item xs={6}>
          <Items
            name="Tournaments"
            topic="popular gaming events and tournaments"
            logo={tournamentLogo}
          />
        </Grid>

        <Grid item xs={6}>
          <Items
            name="Streaming"
            topic="your favorite streamers"
            logo={streamLogo}
          />
        </Grid>

        <Grid item xs={6}>
          <Items
            name="Entertainment"
            topic="your favorite sources of entertainment"
            logo={entLogo}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Categories;
