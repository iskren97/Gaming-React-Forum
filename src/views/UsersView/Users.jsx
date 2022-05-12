import { Container, Divider, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/users.service';
import './Users.css';

import Footer from '../../components/Footer/Footer';
import DisplayUser from './DisplayUser';

import usersPic from '../../assets/users.jpg';
import defaultPic from '../../assets/avatar.jpg';

import SearchIcon from '@mui/icons-material/Search';

const UsersView = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getAllUsers().then((resp) => setUsers(Object.values(resp.val())));
  }, []);

  return (
    <div className="wrapper">
      <div className="profile-container">
        <div className="profile-background">
          <img src={usersPic} alt="background"></img>
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
                Forum Users
              </h1>
            </Grid>

            <Grid item xs={6}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                  <input
                    type="text"
                    placeholder="search username"
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
          <br />

          <Grid
            container
            direction="row"
            spacing={2}
            sx={{
              justifyContent: 'center',
            }}
          >
            {users.length !== 0 ? (
              users.map((user) => {
                if (search) {
                  return user.username.toLowerCase().includes(search) ? (
                    <Grid key={user.uid} item>
                      <DisplayUser
                        key={user.uid}
                        avatar={user.avatarUrl ?? defaultPic}
                        role={user.role}
                        username={user.username}
                        firstName={user.firstName}
                        lastName={user.lastName}
                      />
                    </Grid>
                  ) : null;
                }

                return (
                  <Grid key={user.uid} item>
                    <DisplayUser
                      key={user.uid}
                      avatar={user.avatarUrl ?? defaultPic}
                      role={user.role}
                      username={user.username}
                      firstName={user.firstName}
                      lastName={user.lastName}
                    />
                  </Grid>
                );
              })
            ) : (
              <h3>There are no users yet.</h3>
            )}
          </Grid>
        </Container>
      </div>
      <div className="sticky-footer">
        <Footer />
      </div>
    </div>
  );
};

export default UsersView;
