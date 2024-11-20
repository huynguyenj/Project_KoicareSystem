import {
  Button,
  Card,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Form } from "react-router-dom";

function AddWaterParam() {
  const [update, setUpdate] = useState(false);
  const [error,setError] = useState({});
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

  const validate = () =>{
      const newError = {}
      if(!data.mesurementTime || data.mesurementTime.trim() ==""){
            newError.time = "Thời gian không được để trống!"
      }
      if(!data.temperature || data.temperature <= 0){
            newError.temp = "Nhiệt "
      }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) =>{
      e.preventDefault();
  }
  return (
    <Container sx={{ width: "75%" }}>
      <Grid item xs={12} sm={5}>
        <Card sx={{ padding: 5, border: "AppWorkspace" }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Thông số nước
          </Typography>
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
