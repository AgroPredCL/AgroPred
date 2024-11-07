// src/components/ResponseModal.js
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

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

const ResponseModal = ({ isOpen, onClose, responseData }) => {

    return (
        <Modal
          open={isOpen}
          onClose={onClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {responseData}
            
            <br></br>
            <Button onClick={onClose} variant="contained" color="primary" sx={{ mt: 2 }}>
              Cerrar
            </Button>
          </Box>
        </Modal>
    );
};

export default ResponseModal;
