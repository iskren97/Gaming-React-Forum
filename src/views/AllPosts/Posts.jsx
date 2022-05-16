import { Container, Divider, Grid, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../../services/posts.service';

import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';

import Footer from '../../components/Footer/Footer';

import Sort from './Sort';
import postsImg from '../../assets/posts.jpg';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getAllPosts().then((resp) => setPosts(resp));
  }, [posts]);

  return (
    <div className="wrapper">
      <div className="profile-container">
        <div className="profile-background">
          <img src={postsImg} alt="background"></img>
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
              <h1
                style={{
                  textAlign: 'center',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  fontSize: '33px',
                }}
              >
                Forum Posts
              </h1>
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
                      setSearch(e.target.value.toLowerCase());
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

          {posts.length !== 0 ? (
            <div>
              <Tooltip title="Sort by:" placement="right">
                <SortIcon />
              </Tooltip>

              <Sort posts={posts} search={search} />
            </div>
          ) : (
            <h3 style={{ textAlign: 'center' }}>There are no posts yet.</h3>
          )}
        </Container>
      </div>

      <div className="sticky-footer">
        <Footer />
      </div>
    </div>
  );
};

export default Posts;
