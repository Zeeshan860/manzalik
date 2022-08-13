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
  const { name, cover, colors, status } = product;

  return (
    <Card style={{ width: '100%'}}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
         <ProductImgStyle alt={name} src={cover} />
       
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography   marginLeft={-1} variant="subtitle2" noWrap>
            {name}
            <Stack marginLeft={0.1}>
              <h2>PKR 23,400</h2>
            </Stack>
            <h> <Stack>  Furnished </Stack></h>
           
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={colors} />

          <Typography varia3nt="subtitle1">
            <Stack spacing={2} direction="row" marginLeft={-20.5}>
              <LocalHotelOutlinedIcon />5
              <BathtubOutlinedIcon />3
              <CountertopsOutlinedIcon />2
              <SquareFootOutlinedIcon />
              5 Marla
            </Stack>
       
            <Stack marginLeft={-20.5} marginTop={1} >
              <p>
                <h3>Description:</h3> House available for rent
              </p>
            </Stack>
            
            <Stack marginLeft={-20.5}>
              <h3>Phone n.o</h3>
              <Stack direction="row" marginTop={1} >
                <PhoneAndroidOutlinedIcon />
                03165038814
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
