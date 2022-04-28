import Container from '@mui/material/Container';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Items from './Items';

import generalLogo from '../../icons/general.png';
import shooterLogo from '../../icons/sniper.png';
import mmoLogo from '../../icons/mmo.png';
import adventureLogo from '../../icons/adventure.png';

const Categories = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        height: '100vh',
        backgroundColor: 'white',
        boxShadow: '0 1px 6px rgba(0,0,0,0.2)',
        marginTop: '50px',
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
          <Items />
        </Grid>
        <Grid item xs={6}>
          <Items />
        </Grid>
        <Grid item xs={6}>
          <Items />
        </Grid>

        <Grid item xs={6}>
          <Items />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Categories;
