import React, { useContext, useState } from 'react';
import './Topic.css';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AppContext from '../../providers/AppContext';
import { Box, Button, Divider, Modal } from '@mui/material';
import swal from 'sweetalert';
import { addPost } from '../../services/posts.service';

const DropDown = ({ test, set }) => {
  const [isActive, setIsActive] = useState(false);

  const topics = [
    'General Discussion',
    'Shooters',
    'MMORPG',
    'Real Time Strategy',
    'Adventure',
    'Gaming Laptops and PCs',
    'Gaming Accessories',
    'Tournaments',
    'Streaming',
    'Entertainment',
  ];

  const [selected, setSelected] = useState('Choose Category');

  const handleClose = () => set(false);

  const { user, userData } = useContext(AppContext);
  const username = userData?.username;

  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    paddingTop: 0,
    paddingBottom: 0,
  };

  const handleValidation = (title, content, category) => {
    if (title === '' || title.length < 16 || title.length > 64) {
      swal(
        'Something went wrong...',
        'Post title must be between 16 and 64 characters long!',
        'error'
      );

      return false;
    }

    if (content === '' || content.length < 32 || content.length > 8192) {
      swal(
        'Something went wrong...',
        'Post content must be between 32 and 8192 characters long!',
        'error'
      );

      return false;
    }

    if (!topics.includes(category)) {
      swal(
        'Something went wrong...',
        'Please choose a valid category',
        'error'
      );

      return false;
    }

    return true;
  };

  const createPost = () => {
    if (handleValidation(title, content, category)) {
      handleClose();
      swal('Good job!', 'Post uploaded successfully!', 'success');
      return addPost(title, content, username, category);
    }
  };

  return (
    <>
      {user ? userData.role !== 'blocked' ? (
        <Modal
          open={test}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '20px',
              }}
            >
              <h3>New Topic</h3>

              <button
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '27px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  float: 'right',
                }}
                onClick={() => handleClose()}
              >
                X
              </button>
            </div>

            <Divider />
            <br />

            <div className="dropdown">
              <div
                className="dropdown-btn"
                onClick={() => setIsActive(!isActive)}
              >
                {selected}
                <ExpandMoreIcon />
              </div>

              {isActive && (
                <div className="dropdown-content">
                  {topics.map((topic) => {
                    return (
                      <div
                        key={topics.indexOf(topic)}
                        onClick={(e) => {
                          setSelected(topic);
                          setIsActive(false);

                          setCategory(e.target.textContent);
                        }}
                        className="dropdown-item"
                      >
                        {topic}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <form className="post-form">
              <h3>Title</h3>

              <input
                maxLength="61"
                type="text"
                style={{ width: '700px' }}
                onChange={(e) => setTitle(e.target.value)}
              />

              <h3>Content</h3>
              <textarea
                maxLength="8192"
                name="content"
                rows="5"
                style={{ resize: 'none', fontSize: '15px' }}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>

              <Button
                onClick={() => createPost()}
                variant="contained"
                style={{ background: '#47DB00' }}
              >
                Post
              </Button>
            </form>
          </Box>
        </Modal>
      ) :   
      (
        <Modal
          open={test}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '20px',
              }}
            >
              <h3>New Topic</h3>

              <button
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '27px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  float: 'right',
                }}
                onClick={() => handleClose()}
              >
                X
              </button>
            </div>

            <Divider />
            <br />

            <h3 style={{ textAlign: 'center' }}>You are blocked from writing posts!</h3>
          </Box>
        </Modal>
      )
      
      
      : (
        <Modal
          open={test}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '20px',
              }}
            >
              <h3>New Topic</h3>

              <button
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '27px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  float: 'right',
                }}
                onClick={() => handleClose()}
              >
                X
              </button>
            </div>

            <Divider />
            <br />

            <h3 style={{ textAlign: 'center' }}>Log In to write a topic!</h3>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default DropDown;
