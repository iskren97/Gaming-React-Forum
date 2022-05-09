import { Container, Divider, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../../services/posts.service';

import SearchIcon from '@mui/icons-material/Search';
import Footer from '../../components/Footer/Footer';

import Sort from './Sort';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getAllPosts().then((resp) => setPosts(resp));
  }, []);

  return (
    <div className="wrapper">
      <div className="profile-container">
        <div className="profile-background">
          <img
            src="https://wwd.com/wp-content/uploads/2020/08/adobestock_187467657.jpeg"
            alt="background"
          ></img>
        </div>

        <Container
          maxWidth="xl"
          sx={{
            backgroundColor: 'white',
            boxShadow: '0 1px 6px rgba(0,0,0,0.2)',
            marginTop: '50px',
            marginBottom: '50px',
            paddingBottom: '55px',
          }}
        >
          <Grid
            container
            direction="row"
            spacing={50}
            style={{ alignItems: 'center', textAlign: 'center' }}
          >
            <Grid item xs={6}>
              <h1 style={{ textAlign: 'center' }}>Forum Posts</h1>
            </Grid>

            <Grid item xs={6}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                  <input
                    type="text"
                    placeholder="search post"
                    className="searchBox"
                    minLength="3"
                    maxLength="32"
                    onChange={(e) => {
                      e.preventDefault();
                      setSearch(e.target.value.toUpperCase());
                    }}
                  />
                </div>

                <div>
                  <SearchIcon fontSize="large" />
                </div>
              </div>
            </Grid>
          </Grid>

          <Divider />

          <br />
          <h2>Sort by:</h2>
          <br />

          <Sort posts={posts} search={search} />
        </Container>
      </div>

      <div className="sticky-footer">
        <Footer />
      </div>
    </div>
  );
};

export default Posts;
