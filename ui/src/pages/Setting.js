import React from 'react';
import { Modal, Stack, Button, TextField, Box } from '@mui/material/index';


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

export default function ChangePassword({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack>
          <h3>Change Password</h3>
        </Stack>
        <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
          <TextField type={'string'} id="outlined-basic" label="Old Password" variant="outlined" />
        </Stack>
        <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
          <TextField type={'string'} id="outlined-basic" label="New Password" variant="outlined" />
        </Stack>
        <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
          <TextField type={'string'} id="outlined-basic" label="Confirm Password" variant="outlined" />
        </Stack>

        <Stack direction="row" sx={{ mt: 2 }}>
          <Button variant="contained">Reset</Button>
        </Stack>
      </Box>
      
    </Modal>
  );
}
