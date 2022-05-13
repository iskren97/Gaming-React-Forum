import React, { useContext, useEffect, useState } from 'react';
import './ProfilePage.css';

import { updateDescription } from '../../services/users.service';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Divider, Tooltip } from '@mui/material';

import background from '../../assets/lR2zdL.jpg';
import defaultAvatar from '../../assets/avatar.jpg';

import EditIcon from '@mui/icons-material/Edit';
import TopicRow from '../CategoryView/TopicRow/TopicRow';

import AppContext from '../../providers/AppContext';
import BlockIcon from '@mui/icons-material/Block';
import Achievements from './Achievements/Achievements';


import swal from 'sweetalert';
import {
  getAllPosts,
  getCommentsFromUser,
  getPostById,
  getCommentById,
} from '../../services/posts.service';
import {
  getUserData,
  getUserByHandle,
  updateUserRole,
} from '../../services/users.service';
import { useParams } from 'react-router-dom';
import UploadCover from './UploadCover';
import UploadProfile from './UploadProfile';

const ProfilePage = () => {
  const { user, userData, setContext } = useContext(AppContext);

  const [userPosts, setUserPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [commentsOnPosts, setCommentsOnPosts] = useState([]);
  const [isProfileOwner, setIsProfileOwner] = useState(false);
  const [userProfile, setUserProfile] = useState('');

  const { username } = useParams();

  useEffect(() => {
    if (username) {
      getUserByHandle(username).then((res) => {
        setUserProfile(res.val());
      });
    } else {
      getUserData(userData?.uid).then((user) => {
        if (userProfile === '') {
          setUserProfile(user.val()[Object.keys(user.val())[0]]);
        }
      });
    }

    if (!userData) {
      setIsProfileOwner(false);
    } else if (userData?.username === username) {
      setIsProfileOwner(true);
    } else {
      setIsProfileOwner(false);
    }
  }, [userData?.uid, username, userData, userProfile, isProfileOwner]);

  useEffect(() => {
    const getPostsByUser = () => {
      return getAllPosts().then((posts) => {
        return posts.filter((post) => post.author === userProfile.username);
      });
    };

    const getLikedByUser = () => {
      return getAllPosts().then((posts) => {
        return posts.filter((post) =>
          post.likedBy.includes(userProfile.username)
        );
      });
    };

    getLikedByUser().then((data) => setLikedPosts(data));

    getPostsByUser().then((data) => setUserPosts(data));
  }, [userProfile, username]);

  useEffect(() => {
    const getUsersComments = () => {
      return getCommentsFromUser(userProfile.username).then((data) => {
        return data.val();
      });
    };
    getUsersComments().then((data) => {
      const filtered = [];
      const userComments = [];

      for (let post in data) {
        getPostById(post).then((data) => {
          const currentPost = {...data};

          const comments = []
          data.comments.forEach((comment) => {
            getCommentById(data.id, comment).then((response) => {
              if (response.author === userProfile.username) {
                comments.push(comment);
              }
            });
          });
          currentPost.comments = comments;
          filtered.push(currentPost);
        });
      }

      setCommentsOnPosts(filtered);
    });
  }, [userProfile.username]);

  const [isUserBlocked, setIsUserBlocked] = useState(
    userProfile.role === 'blocked'
  );

  const handleBlockUser = () => {
    if (isUserBlocked) {
      updateUserRole(username, 'user').then(() => {
        setIsUserBlocked(false);
      });
    } else {
      updateUserRole(username, 'blocked').then(() => {
        setIsUserBlocked(true);
      });
    }
  };

  const setUserDescription = () => {
    swal({
      content: {
        element: 'input',
        attributes: {
          placeholder: 'Shortly describe yourself',
          type: 'text',
          maxLength: 63,
          closeModal: true,
        },
      },
      button: {
        text: 'Submit',
      },
    }).then((description) => {
      if (!description) {
        return;
      }

      updateDescription(userProfile.username, description).then(() => {
        setContext({
          user,
          userData: {
            ...userData,
            userDescription: description,
          },
        });
      });
    });
  };

  return (
    <>
      <div className="profileContainer">
        <div className="profileBackground">
          <img src={userProfile.coverUrl ?? background} alt="cover"></img>
        </div>

        <UploadCover />

        <Container
          maxWidth="lg"
          sx={{
            height: 'auto',
            backgroundColor: 'white',
            boxShadow: '0 1px 6px rgba(0,0,0,0.2)',
            marginTop: '50px',
            marginBottom: '50px',
            padding: '55px',
          }}
        >
          <Grid
            container
            direction="column"
            spacing={1}
            sx={{
              textAlign: 'center',
              color: 'white',
              backgroundImage: `url('https://images2.alphacoders.com/473/thumb-1920-473109.png')`,
            }}
          >
            <h1
              style={{
                fontWeight: 500,
                textTransform: 'uppercase',
                fontSize: '33px',
              }}
            >
              User Profile
            </h1>
            <Divider />

            <Grid item>
              <Grid
                container
                direction="row"
                sx={{
                  alignItems: 'center',
                }}
              >
                <Grid
                  item
                  xs={7}
                  sx={{
                    textAlign: 'left',
                  }}
                >
                  <h2>Personal Information</h2>
                  <br />

                  <p>First Name: {userProfile.firstName}</p>
                  <p>Last Name: {userProfile.lastName}</p>
                  <p>Email: {userProfile.email}</p>
                </Grid>

                <Grid item xs={5} sx={{ textAlign: 'right' }}>
                  {userProfile.avatarUrl ? (
                    <img
                      className="avatar"
                      src={userProfile.avatarUrl}
                      alt="profile"
                    />
                  ) : (
                    <img
                      className="avatar"
                      src={defaultAvatar}
                      alt="profile"
                    ></img>
                  )}
                </Grid>
              </Grid>
            </Grid>

            <UploadProfile />

            <Grid item>
              <Divider />
              <h1>
                {userProfile.username}{' '}
                {userData?.role === 'admin' && userProfile.role !== 'admin' ? (
                  <Tooltip
                    title={
                      isUserBlocked ? 'Unblock this user' : 'Block this user'
                    }
                    placement="bottom"
                  >
                    <BlockIcon
                      className={
                        isUserBlocked ? 'blockedUserButton' : 'blockButton'
                      }
                      onClick={() => handleBlockUser()}
                    />
                  </Tooltip>
                ) : null}
              </h1>
            </Grid>

            <Grid item>
              <p style={{ marginBottom: '24px' }}>
                {userProfile.userDescription || 'My description'}{' '}
                {isProfileOwner ? (
                  <a href="#/" onClick={setUserDescription}>
                    <Tooltip title="Change description" placement="right-end">
                      <EditIcon sx={{ cursor: 'pointer' }} />
                    </Tooltip>
                  </a>
                ) : null}
              </p>
            </Grid>

         

          </Grid>
          <Divider />

<Grid item>
 <Achievements user={userProfile} />
</Grid>

<Divider />

          <Grid
            container
            maxWidth="xl"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <h1>{isProfileOwner ? 'My Posts:' : 'Posts'}</h1>

            {userPosts.length !== 0 ? (
              <Grid
                sx={{
                  marginTop: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  alignItems: 'stretch',
                }}
              >
                {userPosts.map((post) => (
                  <TopicRow key={post.id} row={post} />
                ))}
              </Grid>
            ) : (
              <div>
                <h3> {isProfileOwner ? 'You have no posts yet' : 'No posts yet.'}</h3>
              </div>
            )}

            <h1>{isProfileOwner ? 'My Likes:' : 'Likes'}</h1>
            {likedPosts.length !== 0 ? (
              <Grid
                sx={{
                  marginTop: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  alignItems: 'stretch',
                }}
              >
                {likedPosts.map((post) => (
                  <TopicRow key={post.id} row={post} />
                ))}
              </Grid>
            ) : (
              <div>
                <h3> {isProfileOwner ? 'You have no likes yet' : 'No likes yet.'}</h3>
              </div>
            )}

            <h1>{isProfileOwner ? 'My Comments:' : 'Comments'}</h1>
            {commentsOnPosts?.length !== 0 ? (
              <Grid
                sx={{
                  marginTop: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  alignItems: 'stretch',
                }}
              >
                {commentsOnPosts?.map((post) => (
                  <TopicRow row={post} />
                ))}
              </Grid>
            ) : (
              <div>
                <h3> {isProfileOwner ? 'You have no comments yet' : 'No comments yet.'} </h3>
              </div>
            )}
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default ProfilePage;
