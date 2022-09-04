import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// material
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Select,
  MenuItem,
  FormControl,
  Checkbox,
  TextField,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
  InputLabel,
} from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import Data from '../../../components/data.json';

// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];
export const FILTER_GENDER_OPTIONS = ['Men', 'Women', 'Kids'];
export const FILTER_CATEGORY_OPTIONS = ['Furnished', 'Non Furnished'];
export const FILTER_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];
export const FILTER_PRICE_OPTIONS = [
  { value: 'below', label: 'Below $25' },
  { value: 'between', label: 'Between $25 - $75' },
  { value: 'above', label: 'Above $75' },
];
export const FILTER_COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

// ----------------------------------------------------------------------

ShopFilterSidebar.propTypes = {
  isOpenFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};

export default function ShopFilterSidebar({ isOpenFilter, onOpenFilter, onCloseFilter, setFilterData, filterData }) {
  const [cityData, setCityData] = useState([]);
  const [province, setProvince] = useState(null);
  const [city, setCity] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(()=>{
    if(filterData) {
      setCity(filterData.city);
    setProvince(filterData.province);
    setCategory(filterData.category);
    setMinPrice(filterData.minPrice);
    setMaxPrice(filterData.maxPrice);
    }

  }, [filterData, isOpenFilter])

  const handleProvince = (e) => {
    const getCitydata = Data.find((province) => province.provincename === e.target.value)?.cities;
    setProvince(e.target.value);
    setCity(null);
    setCityData(getCitydata || []);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const onClearAllClick = () => {
    setCity(null);
    setProvince(null);
    setCategory(null);
    setMinPrice(null);
    setMaxPrice(null);
  };

  const onApplyChangesClick = () => {
    setFilterData({
      city,
      province,
      category,
      minPrice,
      maxPrice
    });
    onCloseFilter();
  };

  return (
    <>
      <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />} onClick={onOpenFilter}>
        Filters&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={isOpenFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" width={20} height={20} />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <div>
              <FormControl fullWidth>
                <InputLabel id="province" >Province</InputLabel>
                <Select
                  value={province}
                  onChange={handleProvince}
                >
                  <MenuItem value="" key="None">
                    {' '}
                  </MenuItem>
                  {Data.map((getprovinceId, index) => (
                    <MenuItem value={getprovinceId.provincename} key={index}>
                      {getprovinceId.provincename}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl fullWidth>
                <InputLabel id="city" >City</InputLabel>
                <Select
                  value={city}
                  onChange={handleCity}
                >
                  <MenuItem value="" key="None">
                    {' '}
                  </MenuItem>
                  {cityData.map((getcity, index) => (
                    <MenuItem value={getcity.cityname} key={index}>
                      {getcity.cityname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Category
              </Typography>
              <RadioGroup>
                {FILTER_CATEGORY_OPTIONS.map((item) => (
                  <FormControlLabel checked={category === item} key={item} onClick={()=> setCategory(item)} value={item} control={<Radio />} label={item} />
                ))}
              </RadioGroup>
            </div>
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Price
              </Typography>
              <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Minimum"
                  value={minPrice}
                  onChange={(e)=> setMinPrice(e.target.value)}
                />
                <TextField
                  fullWidth
                  type="number"
                  label="Maximum"
                  value={maxPrice}
                  onChange={(e)=> setMaxPrice(e.target.value)}
                />

              </Stack>
            </div>
          </Stack>
        </Scrollbar>

        <Stack sx={{ p: 3 }} spacing={0.5}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
            onClick={onClearAllClick}
          >
            Clear All
          </Button>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="primary"
            variant="contained"
            // startIcon={<Iconify icon="ic:round-clear-all" />}
            onClick={onApplyChangesClick}
          >
            Apply Changes
          </Button>
        </Stack>
        {/* <Box sx={{ p: 3 }}>
          
        </Box> */}
      </Drawer>
    </>
  );
}
