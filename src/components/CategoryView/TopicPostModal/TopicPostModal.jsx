import React from 'react';
import { useState, useContext } from 'react';
import './TopicPostModal.css';

import AppContext from '../../../providers/AppContext';

import Button from '@mui/material/Button';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';

import { addPost } from '../../../services/posts.service';

import swal from 'sweetalert';

function TopicPostModal({ onClose, category, postModal, setPostModal }) {
  const handleClose = () => {
    setPostModal(false);
  };

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const {
    userData: { username },
  } = useContext(AppContext);

  const handleValidation = (title, content) => {
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

    return true;
  };

  const createPost = () => {
    if (handleValidation(title, content)) {
      onClose();
      swal('Good job!', 'Post uploaded successfully!', 'success');
      return addPost(title, content, username, category);
    }
  };

  return (
    <Modal
      open={postModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="post-modal">
        <form className="post-form">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>Title</h3>

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

          <input
            maxLength="55"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />

          <h3>Content</h3>
          <textarea
            maxLength="8192"
            name="content"
            rows="5"
            style={{ resize: 'none' }}
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
  );
}

export default TopicPostModal;
