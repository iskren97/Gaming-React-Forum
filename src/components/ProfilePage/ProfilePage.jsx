import React, { useContext, useEffect, useState } from 'react';
import './ProfilePage.css';

import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { storage } from '../../config/firebase-config';

import {
  updateDescription,
  updateUserProfilePicture,
} from '../../services/users.service';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Box, Divider, Modal, Tooltip } from '@mui/material';

import background from '../../assets/lR2zdL.jpg';
import defaultAvatar from '../../assets/avatar.jpg';

import EditIcon from '@mui/icons-material/Edit';
import TopicRow from '../CategoryView/TopicRow/TopicRow';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import AppContext from '../../providers/AppContext';

import swal from 'sweetalert';
import { getAllPosts } from '../../services/posts.service';
import { getUserData, getUserByHandle } from '../../services/users.service';
import { useParams } from 'react-router-dom';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ProfilePage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { user, userData, setContext } = useContext(AppContext);


  const [categoryPosts, setCategoryPosts] = useState([]);
  const [isProfileOwner, setIsProfileOwner] = useState(false)
  const [userProfile, setUserProfile] = useState("")
  
  const { username } = useParams();

  useEffect(() => {
    if(username){
      getUserByHandle(username).then((res) => {
        setUserProfile(res.val());
      });
    }else{
      getUserData(userData?.uid).then(user => {
        if(userProfile === ""){
          setUserProfile(user.val()[Object.keys(user.val())[0]])
        }
      })
    }

    if(userData?.username == userProfile.username){
      setIsProfileOwner(true)
    }
      
    },[userData?.uid, username, userData, userProfile]);
    




  useEffect(() => {
    const getPostsByUser = () => {
      return getAllPosts().then((posts) => {
        return posts.filter((post) => post.author === userProfile.username);
      });
    };

    getPostsByUser().then((data) => setCategoryPosts(data));

  }, [userProfile, username]);







  const uploadPicture = (e) => {
    e.preventDefault();

    const file = e.target[0]?.files?.[0];

    if (!file) return swal('Oops..', 'Please select a file!', 'error');

    if (file['type'].split('/')[0] !== 'image')
      return swal(
        'Something went wrong...',
        'Please upload an image!',
        'error'
      );

    const picture = storageRef(storage, `images/${userProfile.username}/avatar`);

    uploadBytes(picture, file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref).then((url) => {
          return updateUserProfilePicture(userProfile.username, url).then(() => {
            setContext({
              user,
              userData: {
                ...userData,
                avatarUrl: url,
              },
            });

            swal('Good job!', 'Image uploaded successfully!', 'success');
            handleClose();
          });
        });
      })
      .catch(console.error);
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
      {user ? (
        <div className="profileContainer">
          <div className="profileBackground">
            <img src={background} alt="background"></img>
          </div>

          <Container
            maxWidth="lg"
            sx={{
              height: 'auto',
              backgroundColor: 'white',
              boxShadow: '0 1px 6px rgba(0,0,0,0.2)',
              marginTop: '50px',
              paddingBottom: '55px',
            }}
          >
            <Grid
              container
              direction="column"
              spacing={1}
              sx={{ textAlign: 'center' }}
            >
              <h1>User Profile</h1>
              <Divider />

              <Grid item>
                <Grid container direction="row" sx={{ alignItems: 'center' }}>
                  <Grid item xs={7} sx={{ textAlign: 'left' }}>
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

                    {isProfileOwner ?
                    <a
                      href="#/"
                      onClick={handleOpen}
                      style={{
                        color: 'black',
                        fontSize: '13.5px',
                        textTransform: 'none',
                      }}
                    >
                      <Tooltip
                        title="Change profile picture"
                        placement="right-end"
                      >
                        <EditIcon sx={{ cursor: 'pointer' }} />
                      </Tooltip>
                    </a> : null}
                    
                  </Grid>
                </Grid>
              </Grid>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div
                    style={{
                      display: 'flex',
                      top: '-50px',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <h3>Upload a picture</h3>

                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                      onClick={handleClose}
                    >
                      X
                    </button>
                  </div>

                  <form onSubmit={uploadPicture}>
                    <Grid
                      container
                      direction="column"
                      spacing={0}
                      sx={{ textAlign: 'center', alignItems: 'center' }}
                    >
                      <Grid>
                        <input
                          type="file"
                          accept="image/*"
                          className="custom-file-upload"
                        />
                      </Grid>

                      <Grid>
                        <button className="upload-pic-btn" type="submit">
                          Click to upload
                        </button>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
              </Modal>

              <Grid item>
                <Divider />
                <h1>{userProfile.username}</h1>
              </Grid>

              <Grid item>
                <p style={{ marginBottom: '24px' }}>
                  {userProfile.userDescription || "My description"}{' '}
                  {isProfileOwner ? <a href="#/" onClick={setUserDescription}>
                  
                    <Tooltip title="Change description" placement="right-end">
                      <EditIcon sx={{ cursor: 'pointer' }} />
                    </Tooltip>
                  </a> : null}
                  
                </p>
              </Grid>

              <Divider />
            </Grid>
            <Grid container
                maxWidth="xl"
                sx={{display: "flex", justifyContent: 'center', flexDirection: "column"}} >
            <h1>{isProfileOwner ? "My Posts:" : "Posts"}</h1>

            {categoryPosts.length !== 0 ? (
                <Grid
                  sx={{
                    marginTop: '0.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    width: "100%",
                    alignItems: "stretch"
                  }}
                >
              {categoryPosts.map((post) => (
                  <TopicRow key={post.id} row={post} />
              ))}
                </Grid>
            ) : (
              <div>
                <h3> You have no posts yet.</h3>
              </div>
            )}
            </Grid>
          </Container>
        </div>
      ) : null}
    </>
  );
};

export default ProfilePage;
