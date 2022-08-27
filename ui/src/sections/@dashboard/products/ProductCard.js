import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import LocalHotelOutlinedIcon from '@mui/icons-material/LocalHotelOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import SquareFootOutlinedIcon from '@mui/icons-material/SquareFootOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import CountertopsOutlinedIcon from '@mui/icons-material/CountertopsOutlined';
import Checkbox from '@mui/material/Checkbox';

import { ColorPreview } from '../../../components/color-utils';
import Label from '../../../components/Label';


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
  const { area,description,bedRooms,washRooms,kitchen, rentalPrice,furnished,phoneNo,province,image,city} = product;

  return (
    <Card style={{ width: '100%'}}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        { furnished && (
          <Label
            variant="filled"
            color={(furnished  && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {furnished ? 'Furnished': 'Non Furnished'} 
          </Label>
        )}
         <ProductImgStyle alt={province} src={image} />
       
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
       
          <Typography   marginLeft={-1} variant="subtitle2" noWrap>
            {city}
            <Stack marginLeft={0.1}>
             {rentalPrice} PKR
            </Stack>
             {/* <Stack> {furnished} </Stack> */}
           
          </Typography>
        

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}

          <Typography varia3nt="subtitle1">
            <Stack spacing={2} direction="row" marginLeft={-20.5}>
              <LocalHotelOutlinedIcon bedRooms={bedRooms} />
              <BathtubOutlinedIcon washRooms={washRooms}/>
              <CountertopsOutlinedIcon kitchen={kitchen}/>
              <SquareFootOutlinedIcon  area={area}/>
              
            </Stack>
       
            <Stack marginLeft={-20.5} marginTop={1} >
              <Stack>
                <Stack>Description:</Stack> {description}
              </Stack>
            </Stack>
            
            <Stack marginLeft={-20.5}>
              <Stack>Phone n.o</Stack>
              <Stack direction="row" marginTop={1} >
                <PhoneAndroidOutlinedIcon />
                {phoneNo}
              </Stack>
            </Stack>
            
           
            <Stack marginLeft={-20.5} direction="row" color="#2196f3" marginTop={1}>
              Added:  4April, 2022
            </Stack>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
