import React, { useState } from 'react';
import Profile from '../Profile/Profile';
import img1 from '../Profile/imgs/iskren.JPG';
import img2 from '../Profile/imgs/georgi.JPG';

import Rating from '@mui/material/Rating';

import { Grid } from '@mui/material';

const AboutPage = () => {
  const [value, setValue] = useState(null);

  return (
    <Grid container spacing={0} direction="row" sx={{ paddingTop: '200px' }}>
      <Grid item xs={4}>
        <Profile
          name="Iskren Gyorev"
          img={img1}
          age="24"
          location="https://www.google.com/maps/place/%D0%92%D0%B8%D0%B4%D0%B8%D0%BD/@43.9796191,22.8423547,13z/data=!3m1!4b1!4m5!3m4!1s0x475379eca2009025:0x1f853ae2f877d8b7!8m2!3d43.996159!4d22.8679302"
          town="Vidin"
          ins="https://www.instagram.com/iskren_e/"
          fb="https://www.facebook.com/icko.gyorev/"
          linked="https://www.linkedin.com/in/iskren-gyorev-4365b1239/"
        />
      </Grid>

      <Grid item xs={4} sx={{ textAlign: 'center' }}>
        <h1>Gaming Forum</h1>
        <p style={{ fontSize: '18px' }}>
          Our Forum project is part of Telerik Academy's JavaScript Alpha
          program, a national IT group and leading IT teaching center. <br />
          <br />
          Visit their corporate site. <br /> © Telerik Academy, 30 Krastyo
          Rakovski Str. <br /> 1729 Sofia, Bulgaria.
          <br />
          <br />
          All rights reserved.
        </p>
      </Grid>

      <Grid item xs={4}>
        <Profile
          name="Georgi Georgiev"
          img={img2}
          age="25"
          location="https://www.google.com/maps/place/%D0%A1%D0%BE%D1%84%D0%B8%D1%8F/@42.695537,23.2539071,12z/data=!3m1!4b1!4m5!3m4!1s0x40aa8682cb317bf5:0x400a01269bf5e60!8m2!3d42.6977082!4d23.3218675"
          town="Sofia"
          ins="https://www.instagram.com/georgigeorgiev96/"
          fb="https://www.facebook.com/georgi.georgiev.dancer/"
          linked="https://www.linkedin.com/in/georgi-georgiev-071605203/"
        />
      </Grid>

      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <h3 component="legend">Rate us:</h3>
        <Rating
          name="simple-controlled"
          value={value}
          size="large"
          onChange={(_, newValue) => {
            setValue(newValue);
          }}
        />
      </Grid>
    </Grid>
  );
};

export default AboutPage;
