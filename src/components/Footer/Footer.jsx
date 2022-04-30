import React from 'react';
import Grid from '@mui/material/Grid';
import { Divider } from '@mui/material';

import InfoIcon from '@mui/icons-material/Info';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import RecommendIcon from '@mui/icons-material/Recommend';

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <Grid container spacing={2} direction="row" className="footer-grid">
        <Grid item xs={3}>
          <h3>About</h3>
          <Divider sx={{ bgcolor: '#47DB00' }} variant={'middle'} />

          <a>
            <InfoIcon style={{ marginTop: '6px' }} />
          </a>
          <p>Who are we?</p>
        </Grid>

        <Grid item xs={3}>
          <h3>Contact</h3>
          <Divider sx={{ bgcolor: '#47DB00' }} variant={'middle'} />

          <a>
            <ContactPageIcon style={{ marginTop: '6px' }} />
          </a>
          <p>Feel free to contact us</p>
        </Grid>

        <Grid item xs={3}>
          <h3>Support</h3>
          <Divider sx={{ bgcolor: '#47DB00' }} variant={'middle'} />

          <a>
            <RecommendIcon style={{ marginTop: '6px' }} />
          </a>
          <p>Show us your appreciation</p>
        </Grid>

        <Grid item xs={3}>
          <h3>Socials</h3>
          <Divider sx={{ bgcolor: '#47DB00' }} variant={'middle'} />

          <Grid
            container
            spacing={2}
            direction="row"
            sx={{
              justifyContent: 'center',
              paddingTop: '6px',
            }}
          >
            <Grid item>
              <a>
                <InstagramIcon />
              </a>
            </Grid>

            <Grid item>
              <a>
                <FacebookIcon />
              </a>
            </Grid>

            <Grid item>
              <a>
                <YouTubeIcon />
              </a>
            </Grid>

            <Grid item>
              <a>
                <LinkedInIcon />
              </a>
            </Grid>
          </Grid>
          <p>Follow us on social media</p>
        </Grid>

        <Grid item xs={12}>
          <p style={{ marginTop: '5px' }}>All rights reserved &copy;</p>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
