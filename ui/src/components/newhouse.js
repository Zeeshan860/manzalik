import React,{useState} from "react";
import { Modal,TextareaAutosize,Stack,Button,TextField,Checkbox,InputLabel,
  Select,Box,FormControl} from '@mui/material/index';
  import { LoadingButton } from '@mui/lab';

import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import { useMutation } from '@apollo/client';
import {NEW_HOUSE_MUTATION} from '../graphql';
import { FormProvider, RHFTextField } from './hook-form';

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

export default function  NewHouseForm({open,setOpen}){

  const [newHouse] = useMutation(NEW_HOUSE_MUTATION);
  const HouseSchema = Yup.object().shape({

      area: Yup.string().required('Area required'),
      // bedRooms: Yup.number().required('Bedrooms required'),
      // kitchens: Yup.number().required('Kitchens required'),
      // washRooms: Yup.number().required('Washrooms required'),
      // noOfStoreys: Yup.string().required('NoOfStoreys required'),
      // retalPrice: Yup.number().required('RentalPrice required'),
      // location: Yup.string().required('Location required'),
      // description: Yup.string().required('Description required'),
      // province: Yup.string().required('Province required'),
      // city: Yup.string().required('City required'),
      // furnished: Yup.boolean().required('required'),
  });

  const defaultValues = {
    area: '',
    // bedRooms: '',
    // kitchens: '',
    // washRooms: '',
    // noOfStoreys: '',
    // retalPrice:'',
    // location:'',
    // description:'',
    // province: '',
    // city:'',
    // furnished:'',
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

    newHouse({variables:formInput})
    
  
  };

  const handleClose = () => {
    setOpen(false);
  }
   
  const [provinceId, setProvinceId]= useState('');
  const [city, setCity]= useState([]);
  const [cityId, setCityId]= useState('');

  const handleprovince=(e)=>{
    const getprovinceId= e.target.value;
    const getCitydata= Data.find(province=>province.provinceid===getprovinceId).cities;
    setCity(getCitydata);
    setProvinceId(getprovinceId);
  // console.log(getcountryId);
  }
  const handlecity = (e)=>{
    const cityId= e.target.value;
    // console.log(stateid);
    setCityId(cityId);

  }

return(
  
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
  <Box sx={style}>
   
   <Stack spacing={2} direction="row"sx={{ mt: 2 }}>
   <RHFTextField  name="area" label="Area(Marla)"/>
   <TextField  type={"number"} id="outlined-basic" label="Bed Rooms" variant="outlined" />
    </Stack>
   
   <Stack spacing={2} direction="row"sx={{ mt: 2 }}>
   <TextField  type={"number"} id="outlined-basic" label="Kitchens" variant="outlined"/>
   <TextField  type={"number"} id="outlined-basic" label="Wash Rooms" variant="outlined" />
    </Stack>

   <Stack spacing={2} direction="row"sx={{ mt: 2 }}>
   <TextField type={"string"} id="outlined-basic" label="No of Storeys" variant="outlined"/>
   <TextField  type={"number"} id="outlined-basic" label="Rental Price" variant="outlined" />
    </Stack>

    <Stack spacing={2} direction="row"sx={{ mt: 2 }}>
    <TextField type={"string"} id="outlined-basic" label="Location" variant="outlined"/>
  <TextareaAutosize
      aria-label="empty textarea"
      minRows={3}
      placeholder="Enter Description"
      style={{ width: 200 }}
    />
  </Stack>


  <Stack spacing={2} direction="row"sx={{ mt: 2 }}>
    <FormControl  style={{marginLeft:'-2px'}} sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor="grouped-native-select">Province</InputLabel>
        <Select name='province' native defaultValue="" id="grouped-native-select" label="Grouping"
       onChange={(e)=>handleprovince(e)}
        >
          <option aria-label="None" value="" />
          {
                      Data.map( (getprovinceId,index)=>(
                          <option value={getprovinceId.provinceid} key={index}>{getprovinceId.provincename}</option> 
                        ))

                        }
        </Select>
      </FormControl>

      <FormControl  style={{marginTop:'6px',marginLeft:'50px'}} sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor="grouped-select">City</InputLabel>
        <Select name='city' native defaultValue="" id="grouped-select" label="Grouping"
        onChange={(e)=>handlecity(e)}
        >
          <option aria-label="None" value="" />
          {
                          city.map((getcity, index)=>(
                            <option value={getcity.cityid} key={index}>{ getcity.cityname }</option>
                          ))
                        }
        </Select>
      </FormControl>

    </Stack>

  <Stack  spacing={2} direction="row" sx={{ mt: 2 }}>
 Furnished<Checkbox style={{marginTop:'-8px'}} {...label} defaultChecked />
  </Stack>

  <div style={{marginLeft:'1px',marginTop:'10px'}} >Upload your house photos</div>
  <Stack spacing={2} direction="row" sx={{ mt: 2 }} alignItems="center">
  <Button variant="outlined" component="label">
        UPLOAD
        <input hidden accept="image/*" multiple type="file" />
      </Button>
    </Stack>
   
   <Stack direction="row"sx={{ mt: 2 }}>
      <Button  variant="outlined" style={{marginLeft:'180px',marginRight:'20px'}}>Cancel</Button>
      {/* <Button type="submit" variant="contained" loading={isSubmitting}>Create</Button> */}
      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>Create</LoadingButton>
    </Stack>
  </Box>
  
 </FormProvider>
</Modal>
);
}