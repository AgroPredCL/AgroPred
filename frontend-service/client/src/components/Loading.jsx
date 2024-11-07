// src/components/LoadingSpinner.js
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Modal } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};


const LoadingSpinner = (OpenLoading) => {
  return (
    

    <Modal
    open={OpenLoading}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
    <Box sx={style}>
      <CircularProgress />

    </Box>
    </Modal>
  );
};

export default LoadingSpinner;
