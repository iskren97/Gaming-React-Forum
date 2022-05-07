import { Container, Divider, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/users.service';
import './Users.css';

import usersPic from '../../assets/users.jpg';
import defaultPic from '../../assets/avatar.jpg';
import DisplayUser from './DisplayUser';
import Footer from '../../components/Footer/Footer';

const UsersView = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((resp) => setUsers(Object.values(resp.val())));
  }, []);

  return (
    <div
      style={{
        backgroundColor: 'rgb(248, 248, 248)',
      }}
    >
      <div className="profile-container">
        <div className="profile-background">
          <img src={usersPic} alt="background"></img>
        </div>
        <Container
          maxWidth="xl"
          sx={{
            height: 'auto',
            backgroundColor: 'white',
            boxShadow: '0 1px 6px rgba(0,0,0,0.2)',
            marginTop: '50px',
            marginBottom: '50px',
            paddingBottom: '55px',
          }}
        >
          <h1 style={{ textAlign: 'center' }}>Forum Users</h1>

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
            {users.map((user) => {
              return (
                <Grid item>
                  <DisplayUser
                    key={user.uid}
                    avatar={user.avatarUrl ?? defaultPic}
                    username={user.username}
                    firstName={user.firstName}
                    lastName={user.lastName}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default UsersView;
