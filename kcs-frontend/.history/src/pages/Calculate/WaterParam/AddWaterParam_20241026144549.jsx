import {
  Button,
  Card,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { getAllPond } from "../../../api/pond_fish";

function AddWaterParam() {
  const [update, setUpdate] = useState(false);
  const [error,setError] = useState({});
  const [ponds,setPonds] = useState([]);
  const [pondId,setPondId] = useState();
  const [data, setData] = useState({
    mesurementTime: "",
    temperature: "",
    salinity: "",
    ph: "",
    o2: "",
    no2: "",
    no3: "",
    po4: "",
  });

  useEffect(()=>{
      getPonds()
  },[])

  const getPonds = async ()=>{
      try {
           const res =  await getAllPond()
           setPonds(res.result)
      } catch (error) {
            console.log(error)
      }
  }
  const validate = () =>{
      const newError = {}
      if(!data.mesurementTime || data.mesurementTime.trim() ==""){
            newError.time = "Thời gian không được để trống!"
      }   
      if(!data.temperature){
            newError.temp = "Nhiệt độ không được để trống!"
      }if(!data.ph|| data.ph < 0){
            newError.ph = "Độ pH không được để trống hoặc < 0"
      }
      if(!data.salinity|| data.salinity < 0){
            newError.salt = "Độ muối không được để trống hoặc < 0"
      }
      if(!data.o2 || data.o2 <= 0){
            newError.o2 = "Nồng độ oxi không được để trống hoặc <= 0"
      }if(!data.no2){
            newError.no2 = "Nồng độ NO2 không được để trống"
      }if(!data.no3){
            newError.no3 = "Nồng độ NO3 không được để trống"
      }if(!data.po4){
            newError.po4 = "Nồng độ PO4 không được để trống"
      }
      setError(newError)
      return Object.keys(newError).length===0;

  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) =>{
      e.preventDefault();
      if(validate()){
            setUpdate(true)

      }
  }
  const handlePond = (e)=>{
      setPondId(e.target.value)
  }
  return (
    <Container sx={{ width: "75%" }}>
      <Grid item xs={12} sm={5}>
        <Card sx={{ padding: 5, border: "AppWorkspace" }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Thông số nước
          </Typography>
          <Select
            labelId="demo"
            value={}
            onChange={handlePond}
          >
            {ponds.map((pond)=>(
                  <MenuItem key = {pond.pondId} value={pond.pondId}>{pond.pondName}</MenuItem>
            ))}
          </Select>
          <Form onSubmit={handleSubmit}>
            <Grid item xs={12} sm={9} container spacing={2}>
              <TextField
                fullWidth
                label="Thời gian đo"
                type="date"
                name="mesurementTime"
                value={data.mesurementTime}
                onChange={handleChange}
                sx={{ mb: 2 }}
                error ={!!error.time}
                helperText={error.time}
                InputLabelProps={{
                  shrink: true,
                }}
              ></TextField>

              <TextField
                fullWidth
                label="Nhiệt độ(°C)"
                type="number"
                name="temperature"
                value={data.temperature}
                onChange={handleChange}
                sx={{ mb: 2 }}
                error ={!!error.temp}
                helperText={error.temp}
              ></TextField>

              <FormControl>
                <TextField
                  fullWidth
                  label="Nồng độ muối"
                  type="number"
                  name="salinity"
                  value={data.salinity}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  error ={!!error.salt}
                  helperText={error.salt}
                ></TextField>
              </FormControl>

              <FormControl>
                <TextField
                  fullWidth
                  label="Độ pH"
                  type="number"
                  name="ph"
                  value={data.ph}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  error ={!!error.ph}
                  helperText={error.ph}
                ></TextField>
              </FormControl>

              <FormControl>
                <TextField
                  fullWidth
                  label="Nồng độ O2"
                  type="number"
                  name="o2"
                  value={data.o2}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  error ={!!error.o2}
                  helperText={error.o2}
                ></TextField>
              </FormControl>

              <FormControl>
                <TextField
                  fullWidth
                  label="Nồng độ NO2"
                  type="number"
                  name="no2"
                  value={data.no2}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  error ={!!error.no2}
                  helperText={error.no2}
                ></TextField>
              </FormControl>

              <FormControl>
                <TextField
                  fullWidth
                  label="Nồng độ NO3"
                  type="number"
                  name="no3"
                  value={data.no3}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  error ={!!error.no3}
                  helperText={error.no3}
                ></TextField>
              </FormControl>

              <FormControl>
                <TextField
                  fullWidth
                  label="Nồng độ PO4"
                  type="number"
                  name="po4"
                  value={data.po4}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  error ={!!error.po4}
                  helperText={error.po4}
                ></TextField>
              </FormControl>
            </Grid>
            <Button
              variant="contained"
              color="success"
              type="submit"
              disabled={update}
            >
              {update ? <CircularProgress color="inherit" /> : "Lưu"}
            </Button>
          </Form>
          <Grid>
            <Button variant="contained" sx={{mt:2,width:'100%'}}>Xem thông số nước</Button>
          </Grid>
        </Card>
      </Grid>
    </Container>
  );
}

export default AddWaterParam;
