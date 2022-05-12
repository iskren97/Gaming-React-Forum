import { ClosedCaptionDisabled } from '@mui/icons-material';
import { Grid, Modal } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UploadProfile = ({ open, close, upload }) => {
  return (
    <Modal
      open={open}
      onClose={close}
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
            onClick={ClosedCaptionDisabled}
          >
            X
          </button>
        </div>

        <form onSubmit={upload}>
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
  );
};

export default UploadProfile;
