import React,{useState,useEffect} from "react";
import { Modal,TextareaAutosize,Stack,Button,TextField,Checkbox,InputLabel,
  Select,Box,FormControl} from '@mui/material/index';

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
  <Box sx={style}>

   <Stack spacing={2} direction="row"sx={{ mt: 2 }}>
   <TextField  type={"number"} id="outlined-basic" label="Area(Marla)" variant="outlined"/>
   <TextField  type={"number"} id="outlined-basic" label="Bed Rooms" variant="outlined" />
    </Stack>
   
   <Stack spacing={2} direction="row"sx={{ mt: 2 }}>
   <TextField  type={"number"} id="outlined-basic" label="Kitchens" variant="outlined"/>
   <TextField  type={"number"} id="outlined-basic" label="Wash Rooms" variant="outlined" />
    </Stack>

   <Stack spacing={2} direction="row"sx={{ mt: 2 }}>
   <TextField type={"number"} id="outlined-basic" label="No of Storeys" variant="outlined"/>
   <TextField  type={"number"} id="outlined-basic" label="Rental Price" variant="outlined" />
    </Stack>

    <Stack spacing={2} direction="row"sx={{ mt: 2 }}>
    <TextField type={"number"} id="outlined-basic" label="Location" variant="outlined"/>
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
      <Button  variant="contained" >Create</Button>
    </Stack>
  

  </Box>
</Modal>
);
}