import { useState } from 'react';
import PropTypes from 'prop-types';
// material
import { Box, Card, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import LocalHotelOutlinedIcon from '@mui/icons-material/LocalHotelOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import SquareFootOutlinedIcon from '@mui/icons-material/SquareFootOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import CountertopsOutlinedIcon from '@mui/icons-material/CountertopsOutlined';
import Moment from 'moment';

import Label from '../../../components/Label';
import {useUser} from '../../../layouts/dashboard'
import OwnerProfileModal from '../../../pages/OwnerProfile';

// ----------------------------------------------------------------------
const ProductImgStyle = styled('img')({
  top: 0,
  width: '120%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});
// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  // const {user} = useUser()
  const [open, setOpen] = useState(false);
  const { user,area, location, description, bedRooms, washRooms, kitchens, rentalPrice, furnished, province, image, city, createdAt } = product;

  return (
    
    <Card style={{ width: '100%' }}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <Label
          variant="filled"
          color={(furnished && 'error') || 'info'}
          sx={{
            zIndex: 9,
            top: 16,
            right: 16,
            position: 'absolute',
            textTransform: 'uppercase',
          }}
        >
          {furnished ? 'Furnished' : 'Non Furnished'}
        </Label>
        <ProductImgStyle alt={province} src={image} />

      </Box>
      <OwnerProfileModal open={open} setOpen={setOpen} user={user} />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row">
          {location}, {city}, {province}
        </Stack>
        <Stack direction="row" style={{ marginTop: "2px", color: 'gray' }}>
          {description}
        </Stack>

        <Stack spacing={2} direction="row" style={{ marginTop: "10px" }}>
          <LocalHotelOutlinedIcon /> <Stack>{bedRooms}</Stack>
          <BathtubOutlinedIcon /> <Stack>{washRooms}</Stack>
        </Stack>
        <Stack spacing={2} direction="row" style={{ marginTop: "2px" }}>
          <CountertopsOutlinedIcon /> <Stack>{kitchens}</Stack>
          <SquareFootOutlinedIcon /> <Stack>{area}</Stack>
        </Stack>

        <Stack direction="row" style={{ marginTop: "10px" }}>
          <PhoneAndroidOutlinedIcon />
          <Stack style={{ marginLeft: "10px" }}>{user?.phoneNo}</Stack>
        </Stack>



        <Stack style={{ marginTop: "10px" }} direction="row" color="#2196f3" >
          <Stack>Added:</Stack>  <Stack style={{ marginLeft: "10px" }}>{Moment(createdAt, "x").format('DD-MM-YYYY')}</Stack>
        </Stack>
        <Stack direction="row" style={{ marginTop: "2px" }}>
          <Typography variant='h5'>

            {rentalPrice} PKR
          </Typography>

        </Stack>
        <Stack sx={{ mt: 4 }}>
          <Button
          // size= "small"
            onClick={() => {
              setOpen(true);
            }}
            // variant="contained"
            
          >
             View Owner Profile
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
