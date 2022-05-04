import React, { useContext, useState } from 'react';
import './ProfilePage.css';

import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { storage } from '../../config/firebase-config';

import { updateUserProfilePicture } from '../../services/users.service';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Box, Button, Divider, Modal } from '@mui/material';

import background from '../../assets/lR2zdL.jpg';
import defaultAvatar from '../../assets/avatar.jpg';

import EditIcon from '@mui/icons-material/Edit';
import TopicRow from '../CategoryView/TopicRow/TopicRow';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import AppContext from '../../providers/AppContext';

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
  const createData = (
    title,
    content,
    author,
    date,
    replies,
    rating,
    comments
  ) => {
    return { title, content, author, date, replies, rating, comments };
  };

  const rows = [
    createData(
      'Are we ever going to see Just Cause 5?',
      " YEAH I SAID IT! I don't know how much longer it's gonna take but i can't take it anymore. This game is just AMAZING! And now what? we prob won't see it again.YEAH I SAID IT! I don't know how much longer it's gonna take but i can't take it anymore. This game is just AMAZING! And now what? we prob won't see it again.YEAH I SAID IT! I don't know how much longer it's gonna take but i can't take it anymore. This game is just AMAZING! And now what? we prob won't see it again.YEAH I SAID IT! I don't know how much longer it's gonna take but i can't take it anymore. This game is just AMAZING! And now what? we prob won't see it again.YEAH I SAID IT! I don't know how much longer it's gonna take but i can't take it anymore. This game is just AMAZING! And now what? we prob won't see it again.YEAH I SAID IT! I don't know how much longer it's gonna take but i can't take it anymore. This game is just AMAZING! And now what? we prob won't see it again.",
      'thrills3eker101',
      '31.05/2021',
      67,
      81
    ),
    createData(
      'WoW retri paladin build',
      "IT's just the best i no.",
      'RetriOverProt',
      '8/08/2022',
      49,
      3
    ),
    createData(
      'Where to go after final boss',
      'Now i have no life...HALP ',
      'justLost',
      '8/11/2022',
      13,
      21
    ),
    createData(
      'Best gaming moust for CS GO',
      'Issi worth spending 200 dollers on am mouse',
      'DumbAi',
      '3/08/2022',
      9,
      9
    ),
  ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { user, userData, setContext } = useContext(AppContext);
  console.log(userData);
  const username = userData?.username;

  const uploadPicture = (e) => {
    e.preventDefault();

    const file = e.target[0]?.files?.[0];

    if (!file) return alert(`Please select a file!`);

    const picture = storageRef(storage, `images/${username}/avatar`);

    uploadBytes(picture, file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref).then((url) => {
          return updateUserProfilePicture(username, url).then(() => {
            setContext({
              user,
              userData: {
                ...userData,
                avatarUrl: url,
              },
            });
          });
        });
      })
      .catch(console.error);
  };

  return (
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
          <Grid item>
            {userData.avatarUrl ? (
              <img src={userData.avatarUrl} alt="profile" />
            ) : (
              <img src={defaultAvatar} alt="profile"></img>
            )}
          </Grid>

          <Grid>
            <a
              onClick={handleOpen}
              style={{
                color: 'black',
                fontSize: '13.5px',
                textTransform: 'none',
                cursor: 'pointer',
              }}
            >
              Change picture <EditIcon />
            </a>
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
                <h4>Upload a picture</h4>
                <Divider sx={{ bgcolor: '#47DB00' }} />

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

              <div>
                <form onSubmit={uploadPicture}>
                  <input type="file" name="file"></input>
                  <button type="submit">Submit</button>
                </form>
              </div>
            </Box>
          </Modal>

          <Grid item>
            <h1>{userData.username}</h1>
          </Grid>

          <Grid item>
            <p style={{ marginBottom: '24px' }}>
              This is my super awesome description that i can also change{' '}
              <EditIcon />
            </p>
          </Grid>

          <Divider />
        </Grid>
        <h1>My Posts:</h1>

        <div className="profilePosts">
          {rows.map((row) => (
            <Grid
              sx={{
                marginTop: '0.5rem',
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <TopicRow row={row} />
              <div className="topicEditDelete">
                <EditIcon /> <DeleteForeverIcon />{' '}
              </div>
            </Grid>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ProfilePage;
