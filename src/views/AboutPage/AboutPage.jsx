import React, { useState } from 'react';
import Profile from '../Profile/Profile';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import { Container, Grid } from '@mui/material';

const AboutPage = () => {
  const [value, setValue] = useState(null);

  return (
    <Grid container spacing={0} direction="row">
      <Grid item xs={4}>
        <Profile />
      </Grid>

      <Grid item xs={4} sx={{ textAlign: 'center' }}>
        <h1>Gaming Forum</h1>
        <p>
          Our Forum project is part of Telerik Academy's JavaScript Alpha
          program, a national IT group and leading IT teaching center. Visit
          their corporate site. © Telerik Academy, 30 Krastyo Rakovski Str. 1729
          Sofia, Bulgaria.
          <br />
          All rights reserved.
        </p>
      </Grid>

      <Grid item xs={4}>
        <Profile />
      </Grid>

      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <h3 component="legend">Rate us:</h3>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(_, newValue) => {
            setValue(newValue);
          }}
        />
      </Grid>
    </Grid>
  );
};

export default AboutPage;
