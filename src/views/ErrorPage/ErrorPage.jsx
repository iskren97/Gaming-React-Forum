import React from 'react';
import { Container } from '@mui/material';

import img from '../ErrorPage/notFound.PNG';

const ErrorPage = () => {
  return (
    <div className="about-container">
      <Container
        maxWidth="md"
        sx={{
          height: 'auto',
          backgroundColor: 'white',
          boxShadow: '0 1px 6px rgba(0,0,0,0.2)',
          paddingTop: '55px',
          paddingBottom: '55px',
          textAlign: 'center'
        }}>
        <img src={img} alt="error" />

        <h1>404</h1>

        <p>Oops.. Page not found!</p>

        <br />
        <br />

        <a
          href="/home"
          style={{
            backgroundColor: '#47DB00',
            fontWeight: 'bold',
            paddingTop: '13px',
            paddingBottom: '13px',
            paddingLeft: '17px',
            paddingRight: '17px',
            border: 'none',
            borderRadius: '5px'
          }}>
          Get back to safety
        </a>
      </Container>
    </div>
  );
};

export default ErrorPage;
