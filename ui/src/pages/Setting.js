import React from 'react';
import * as Yup from 'yup';

import { Modal, Stack, Button, Box } from '@mui/material/index';
import { LoadingButton } from '@mui/lab';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import { CHANGE_PASSWORD_MUTATION } from '../graphql';
import { FormProvider, RHFTextField, RHFTextArea, RHFCheckbox, RHFSelect } from '../components/hook-form';


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
  const [resetPassword] = useMutation(CHANGE_PASSWORD_MUTATION);
  const PasswordSchema = Yup.object().shape({
  
    oldPassword: Yup.string().required('password required'),
    newPassword: Yup.string().required(),
  });
  const defaultValues = {
  
    oldPassword: '',
    newPassword: '',
    
  };
  const methods = useForm({
    resolver: yupResolver(PasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (formInput) => {

    resetPassword({ variables: formInput });
    handleClose();
  };

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
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box sx={style}>
        <Stack>
          Change Password
        </Stack>
        <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
          <RHFTextField type="string" label="Old Password" name="oldPassword"/>
        </Stack>
        <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
        <RHFTextField type="string" label="New Password" name="newPassword"/>
        </Stack>
        <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
        <RHFTextField type="string" label="Confirm Password" name="confirmPassword"/>
        </Stack>
        <Stack direction="row" sx={{ mt: 2 }}>
            <Button onClick={handleClose} style={{ marginLeft: '180px', marginRight: '20px' }}>Cancel</Button>
            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
              Reset
            </LoadingButton>
          </Stack>
        
      </Box>
      </FormProvider>
    </Modal>
  );
}
