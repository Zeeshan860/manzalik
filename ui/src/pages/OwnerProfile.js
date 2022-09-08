import React from 'react';

import { Modal, Stack,Avatar, Box ,TextField, Button} from '@mui/material/index';

// form
import { useForm } from 'react-hook-form';
import { FormProvider } from '../components/hook-form'; 
import {useUser} from '../layouts/dashboard'

// mocks_
import account from '../_mock/account';

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

export default function OwnerProfileModal({ open, setOpen,user }) {
    // const {user} = useUser()

  
  const defaultValues = {
  
    firstName: '',
    lastName: '',
    phoneNo: '',
    email: '',
    
  };
  const methods = useForm({
    
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit =  (formInput) => {
    handleClose();
  };

  const handleClose = () => {
    reset(defaultValues);
    setOpen(false);
  };
  
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box sx={style}>
      <Stack marginLeft={13} marginBottom={30}>
          <Avatar sx={{ width: 140, height: 140 }} src={account.photoURL} alt="photoURL" />
        </Stack>
        <Stack marginTop={-21} >
        <Stack marginLeft={1} spacing={2} direction="row" sx={{ mt:2 }}>
            <Stack marginTop={2} >
                  <h> First Name: </h>
            </Stack>
            <Stack  marginLeft={0}spacing={2} direction="row" sx={{ mt: 2 }}>
            <TextField
          disabled
          id="filled-disabled"
          value= {user?.firstName}
          variant="outlined"
        />
            </Stack>
          </Stack>
          <Stack marginLeft={1} spacing={2} direction="row" sx={{ mt: 2 }}>
            <Stack marginTop={2} >
                  <h >Last Name: </h>
            </Stack>
            <Stack  marginLeft={0}spacing={2} direction="row" sx={{ mt: 2 }}>
            <TextField
          disabled
          id="filled-disabled"
          value= {user?.lastName}
          variant="outlined"
        />
            </Stack>
          </Stack>
          <Stack marginLeft={1} spacing={3} direction="row" sx={{ mt: 2 }}>
            <Stack marginTop={2} >
                  <h >Phone No: </h>
            </Stack>
            <Stack  marginLeft={0}spacing={2} direction="row" sx={{ mt: 2 }}>
            <TextField
          disabled
          id="filled-disabled"
          value= {user?.phoneNo}
          variant="outlined"
        />
            </Stack>
          </Stack>
          <Stack marginLeft={1} spacing={7} direction="row" sx={{ mt: 2 }}>
            <Stack marginTop={2} >
                  <h >Email: </h>
            </Stack>
            <Stack  marginLeft={0}spacing={2} direction="row" sx={{ mt: 2 }}>
            <TextField
          disabled
          id="filled-disabled"
          value= {user?.email}
          variant="outlined"
        />
            </Stack>
          </Stack>
          <Stack direction="row" sx={{ mt: 2 }}>
            <Button onClick={handleClose} style={{ marginLeft: '270px', marginRight: '20px' }}>Cancel</Button>
            
          </Stack>
        </Stack>
      </Box>
      </FormProvider>
    </Modal>
  );
}
