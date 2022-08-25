import React,{ useState }  from 'react';
import * as Yup from 'yup';


import { Modal, Stack, Button, Box , IconButton, InputAdornment} from '@mui/material/index';
import { LoadingButton } from '@mui/lab';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import { CHANGE_PASSWORD_MUTATION } from '../graphql';
import { FormProvider, RHFTextField, RHFTextArea, RHFCheckbox, RHFSelect } from '../components/hook-form';

import Iconify from '../components/Iconify';

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
  const [showPassword, setShowPassword] = useState(false);
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
          
          <RHFTextField
          name="oldPassword"
          label="oldPassword"
          type={showPassword ? 'text' : 'oldPassword'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        </Stack>
        <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
        <RHFTextField
          name="newPassword"
          label="newPassword"
          type={showPassword ? 'text' : 'newPassword'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        </Stack>
        <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
        <RHFTextField
          name="confirmPassword"
          label="confirmPassword"
          type={showPassword ? 'text' : 'confirmPassword'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
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
