import { useState } from 'react';
// @mui
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, TextField, Button } from '@mui/material';

// components

import Page from '../components/Page';

import ChangePassword from './Setting';
// mocks_
import account from '../_mock/account';

export default function Profile({currentUser}) {
  const [open, setOpen] = useState(false);
  return (
    <Page title="Profile">
      <ChangePassword open={open} setOpen={setOpen} />
      <Stack>
        <Stack marginLeft={63} marginBottom={30}>
          <Avatar sx={{ width: 140, height: 140 }} src={account.photoURL} alt="photoURL" />
        </Stack>
        <Stack marginTop={-21} marginLeft={22}>
          <Stack marginLeft={25} spacing={7} direction="row" sx={{ mt: 2 }}>
            <Stack marginTop={2} >
                  <h >First Name: </h>
            </Stack>
            <Stack  marginLeft={2}spacing={2} direction="row" sx={{ mt: 2 }}>
            <TextField
          disabled
          id="filled-disabled"
          value= {currentUser?.firstName}
          variant="outlined"
        />
            </Stack>
          </Stack>
          <Stack marginLeft={25} spacing={7.5} direction="row" sx={{ mt: 2 }}>
            <Stack marginTop={2} >
                  <h >Last Name:</h>
            </Stack>
            <Stack  marginLeft={2}spacing={2} direction="row" sx={{ mt: 2 }}>
            <TextField
          disabled
          id="filled-disabled"
          defaultValue="Asrat Abbasi"
          variant="outlined"
        />
            </Stack>
            
          </Stack>
          <Stack marginLeft={25} spacing={3.5} direction="row" sx={{ mt: 2 }}>
            <Stack marginTop={2} >
                  <h>Phone Number:</h>
            </Stack>
            <Stack  marginLeft={2.5} spacing={1} direction="row" sx={{ mt: 2 }}>
            <TextField
          disabled
          id="filled-disabled"
          defaultValue="03165038814"
          variant="outlined"
        />
            </Stack>
            
          </Stack>
          <Stack  marginLeft={25} spacing={12} direction="row" sx={{ mt: 2 }}>
            <Stack marginTop={2} >
                  <h >Email:</h>
            </Stack>
           
            <Stack>
            <TextField
          
          disabled
          id="filled-disabled"
          defaultValue="eman@gmail.com"
          variant="outlined"
        />
          
            </Stack>
            
          </Stack>
        </Stack>
      
        <Stack sx={{ mt: 4 }}>
          <Button
            onClick={() => {
              setOpen(true);
            }}
            variant="contained"
            style={{ marginLeft: '375px', marginRight: '640px' }}
          >
             Reset Password
          </Button>
        </Stack>
      </Stack>
    </Page>
  );
}
