import { Card, Container, FormControl, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'


function AddWaterParam() {
      const [data,setData] = useState({
            mesurementTime: "",
            temperature: "",
            salinity:"",
            ph:"",
            o2: "",
            no2:"",
            no3:"",
            po4:""
      });

      const handleChange = (e) =>{
            const {name,value} = e.target
            setData({...data, [name]: value})
            
      }
  return (
    <Container>
      <Grid item xs={12} sm={8}>
            <Card sx={{padding:5}}>
                  <FormControl>
                        <Grid item xs={12} sm={8}>
                              <TextField
                              fullWidth
                              label="Thời gian đo"
                              type='date'
                              name='mesurementTime'
                              value={data.mesurementTime}
                              onChange={handleChange}
                              InputLabelProps={
                                    {
                                          shrink:true
                                    }
                              }
                              ></TextField>
                              <TextField
                              fullWidth
                              label = "Nhiệt độ(°C)"
                              type='number'
                              name='temperature'
                              value={data.temperature}
                              onChange={handleChange}
                              >

                              </TextField>
                              <TextField
                              fullWidth
                              label = "Nồng độ muối"
                              type='number'
                              name='salinity'
                              value={data.salinity}
                              onChange={handleChange}
                              >

                              </TextField>
                              <TextField
                              fullWidth
                              label = "p"
                              type='number'
                              name='temperature'
                              value={data.temperature}
                              onChange={handleChange}
                              >

                              </TextField>
                              <TextField
                              fullWidth
                              label = "Nhiệt độ(°C)"
                              type='number'
                              name='temperature'
                              value={data.temperature}
                              onChange={handleChange}
                              >

                              </TextField>
                        </Grid>
                  </FormControl>
            </Card>
      </Grid>
    </Container>
  )
}

export default AddWaterParam