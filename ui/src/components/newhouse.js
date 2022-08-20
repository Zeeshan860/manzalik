import React, { useState } from 'react';
import {
  Modal,
  TextareaAutosize,
  Stack,
  Button,
  TextField,
  Checkbox,
  InputLabel,
  Select,
  Box,
  FormControl,
  MenuItem,
} from '@mui/material/index';
import { LoadingButton } from '@mui/lab';

import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import { useMutation } from '@apollo/client';
import { NEW_HOUSE_MUTATION } from '../graphql';
import { FormProvider, RHFTextField, RHFTextArea, RHFCheckbox, RHFSelect } from './hook-form';

// components
import { AUTH_TOKEN } from '../constant';

import Data from './data.json';

// const URL = 'https://simplemaps.com/data/pk-cities'
// import style from './SvgIconStyle';

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

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function NewHouseForm({ open, setOpen }) {
  const [newHouse] = useMutation(NEW_HOUSE_MUTATION);
  const HouseSchema = Yup.object().shape({
    area: Yup.string().required('Area required'),
    bedRooms: Yup.number().required('Bedrooms required'),
    kitchens: Yup.number().required('Kitchens required'),
    washRooms: Yup.number().required('Washrooms required'),
    noOfStoreys: Yup.string().required('NoOfStoreys required'),
    rentalPrice: Yup.number().required('RentalPrice required'),
    location: Yup.string().required('Location required'),
    description: Yup.string().required('Description required'),
    province: Yup.string().required('Province required'),
    city: Yup.string().required('City required'),
    furnished: Yup.boolean().required('required'),
  });

  const defaultValues = {
    area: '',
    bedRooms: "0",
    kitchens: "0",
    washRooms: "0",
    noOfStoreys: '',
    rentalPrice: "0",
    location: '',
    description: '',
    province: '',
    city: '',
    furnished: true,
  };

  const methods = useForm({
    resolver: yupResolver(HouseSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (formInput) => {
    newHouse({ variables: formInput });
    handleClose()
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [city, setCity] = useState([]);

  const handleProvince = (e) => {
    const getCitydata = Data.find((province) => province.provincename === e.target.value).cities;
    setCity(getCitydata);
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
          <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
            <RHFTextField name="area" label="Area(Marla)" />
            <RHFTextField type="number" label="Bed Rooms" name="bedRooms" />
          </Stack>

          <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
            <RHFTextField type="number" label="Kitchens" name="kitchens" />
            <RHFTextField type="number" label="Wash Rooms" name="washRooms" />
          </Stack>

          <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
            <RHFTextField label="No of Storeys" name="noOfStoreys" />
            <RHFTextField type="number" label="Rental Price" name="rentalPrice" />
          </Stack>

          <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
            <RHFTextField label="Location" name="location" />
            <RHFTextArea placeholder="Enter Description" name="description" />
          </Stack>

          <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
            <RHFSelect
              name="province"
              label="Province"
              defaultValue=""
              // {...useForm.register()}
              execfunction={(e) => handleProvince(e)}
            >
              <MenuItem value="" key="None">{" "}</MenuItem>
              {Data.map((getprovinceId, index) => (
                <MenuItem value={getprovinceId.provincename} key={index}>
                  {getprovinceId.provincename}
                </MenuItem>
              ))}
            </RHFSelect>

            <RHFSelect
              name="city"
              label="City"
              defaultValue=""
            >
              <MenuItem value="" key="None">{" "}</MenuItem>
              {city.map((getcity, index) => (
                <MenuItem value={getcity.cityname} key={index}>
                  {getcity.cityname}
                </MenuItem>
              ))}
            </RHFSelect>

          </Stack>

          <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
            Furnished
            <RHFCheckbox name="furnished" defaultChecked />
          </Stack>

          <div style={{ marginLeft: '1px', marginTop: '10px' }}>Upload your house photos</div>
          <Stack spacing={2} direction="row" sx={{ mt: 2 }} alignItems="center">
            <Button component="label">
              UPLOAD
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </Stack>

          <Stack direction="row" sx={{ mt: 2 }}>
            <Button onClick={handleClose} style={{ marginLeft: '180px', marginRight: '20px' }}>Cancel</Button>
            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
              Create
            </LoadingButton>
          </Stack>
        </Box>
      </FormProvider>
    </Modal>
  );
}
