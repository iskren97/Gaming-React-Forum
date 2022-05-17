import React from 'react';
import './CategoryView.css';
import Button from '@mui/material/Button';
import { useState, useContext, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TopicPostModal from './TopicPostModal/TopicPostModal';
import AppContext from '../../providers/AppContext';
import { NavLink } from 'react-router-dom';

import { getAllPosts } from '../../services/posts.service';
import LoginModal from '../JoinCommunityModal/JoinModal';

import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import Sort from '../../views/AllPosts/Sort';
import { Divider, Tooltip } from '@mui/material';
import Scroll from '../Scroll/Scroll';

const CategoryView = ({ topic, img }) => {
  const [postModal, setPostModal] = useState(false);
  const { user, userData } = useContext(AppContext);
  const [categoryPosts, setCategoryPosts] = useState([]);
  const [search, setSearch] = useState('');

  const onClose = () => {
    setPostModal(!postModal);
  };

  useEffect(() => {
    getAllPosts().then((posts) => {
      const filtered = [];

      posts.forEach((post) => {
        if (post.category === topic) {
          filtered.push(post);
        }
      });
      setCategoryPosts(filtered);
    });
  }, [topic, categoryPosts]);

  return (
    <>
      <div className="viewContainer">
        <div className="hero-image">
          <img src={img} alt="background"></img>
        </div>

        {postModal ? (
          <TopicPostModal
            onClose={onClose}
            category={topic}
            postModal={postModal}
            setPostModal={setPostModal}
          />
        ) : null}

        <div className="categoryRow">
          <div className="buttonsGroup">
            {user && userData.role !== 'blocked' ? (
              <Button
                onClick={() => setPostModal(!postModal)}
                variant="contained"
                style={{ borderRadius: '2em' }}>
                Create a Post
              </Button>
            ) : null}
          </div>

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
        </div>

        <Container
          maxWidth="xl"
          sx={{
            height: 'auto',
            backgroundColor: 'white',
            boxShadow: '0 1px 6px rgba(0,0,0,0.2)',
            marginTop: '2rem',
            marginBottom: '2rem',
            paddingBottom: '1rem'
          }}>
          <Grid container direction="column">
            <Grid item xs={12}>
              <h1>
                <NavLink to="/">Home</NavLink> {'>'} {topic}
              </h1>
            </Grid>

            <Divider />

            <br />

            <br />

            {categoryPosts.length !== 0 ? (
              <Grid item>
                <Tooltip title="Sort by:" placement="right">
                  <SortIcon />
                </Tooltip>

                <Sort posts={categoryPosts} search={search} />
              </Grid>
            ) : (
              <div>
                <h3>
                  {' '}
                  There are no posts in this category. Be the first one to post!{' '}
                  {user ? (
                    <Button
                      onClick={() => setPostModal(!postModal)}
                      variant="contained"
                      style={{ borderRadius: '2em' }}>
                      Create a Post
                    </Button>
                  ) : (
                    <a href="#/" className="join-button">
                      <LoginModal />
                    </a>
                  )}
                </h3>
              </div>
            )}
          </Grid>
        </Container>
      </div>

      <div
        style={{
          position: 'absolute',
          right: '0',
          width: '3%',
          display: 'inline-block',
          margin: '0',
          padding: '0'
        }}>
        <Scroll showBelow={250} />
      </div>
    </>
  );
};

export default CategoryView;
