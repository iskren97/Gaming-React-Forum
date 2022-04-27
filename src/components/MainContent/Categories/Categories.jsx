import './Categories.css';
import Container from '@mui/material/Container';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import ForumIcon from '@mui/icons-material/Forum';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Categories = () => {
  return (
    <Container fixed sx={{ height: '100vh' }}>
      <Grid container spacing={2} direction="column">
        <Grid item xs={12}>
          <h1>Gaming discussions:</h1>
        </Grid>

        <Grid item xs={4}>
          <Item>
            <ForumIcon />
            <h2>General Gaming</h2>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <h2>Action Games</h2>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <h2>Role-playing Games</h2>
          </Item>
        </Grid>

        <Grid item xs={6}>
          <Item>
            <h2>Shooters</h2>
          </Item>
        </Grid>

        <Grid item xs={12}>
          <h1>Computer hardware:</h1>
        </Grid>

        <Grid item xs={6}>
          <Item>
            <h2>Gaming Accessories</h2>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <h2>Gaming Laptops</h2>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <h2>Role-playing Games</h2>
          </Item>
        </Grid>

        <Grid item xs={6}>
          <Item>
            <h2>Role-playing Games</h2>
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Categories;
