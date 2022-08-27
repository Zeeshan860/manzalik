import React,{ useState }  from 'react';
import * as Yup from 'yup';


import { Modal, Stack, Button, Box , IconButton, InputAdornment} from '@mui/material/index';
import { LoadingButton } from '@mui/lab';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import { CHANGE_PASSWORD_MUTATION } from '../graphql';
import { FormProvider, RHFTextField } from './hook-form'; 

import Iconify from './Iconify';

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

export default function ResetPasswordModal({ open, setOpen }) {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetPassword] = useMutation(CHANGE_PASSWORD_MUTATION);
  const PasswordSchema = Yup.object().shape({
  
    oldPassword: Yup.string().required('Password required'),
    newPassword: Yup.string().required("New Password required"),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], "Passwords don't match!")
    .required('Confirm Password Required')
  });
  const defaultValues = {
  
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    
  };
  const methods = useForm({
    resolver: yupResolver(PasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (formInput) => {
    await resetPassword({ variables: formInput });
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
        <Stack>
          Reset Password
        </Stack>
        <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
          
          <RHFTextField
          name="oldPassword"
          label="Old Password"
          type={showOldPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowOldPassword(!showOldPassword)} edge="end">
                  <Iconify icon={showOldPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        </Stack>
        <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
        <RHFTextField
          name="newPassword"
          label="New Password"
          type={showNewPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                  <Iconify icon={showNewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        </Stack>
        <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
        <RHFTextField
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        </Stack>
        <Stack direction="row" sx={{ mt: 2 }}>
            <Button onClick={handleClose} style={{ marginLeft: '180px', marginRight: '20px' }}>Cancel</Button>
            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
              Save
            </LoadingButton>
          </Stack>
        
      </Box>
      </FormProvider>
    </Modal>
  );
}
