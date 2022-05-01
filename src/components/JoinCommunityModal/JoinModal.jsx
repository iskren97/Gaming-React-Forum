import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Register from '../RegisterForm/Register';

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

const JoinModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        style={{
          color: 'white',
          fontSize: '13.5px',
          textTransform: 'none',
          fontFamily: 'Courier New',
        }}
      >
        Join the community
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <button
            style={{
              background: 'none',
              border: 'none',
              width: '0.7em',
              fontSize: '30px',
              fontFamily: 'algerian, courier',
              position: 'absolute',
              top: '0',
              right: '0',
              marginRight: '20px',
              cursor: 'pointer',
            }}
            onClick={handleClose}
          >
            X
          </button>

          <Register />
        </Box>
      </Modal>
    </div>
  );
};

export default JoinModal;