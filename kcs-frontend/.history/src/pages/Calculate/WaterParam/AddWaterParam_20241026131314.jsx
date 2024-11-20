import { Card, Container, FormControl, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Form } from 'react-router-dom';


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
            <Card sx={{padding:5,border:'AppWorkspace'}}>
                  <Typography sx={{mb:3,fontSize:'18px'}}>Thông số nước</Typography>
                  <Form>
                       
                        <Grid item xs={12} sm={6}>
                        <FormControl>
                         <TextField
                              fullWidth
                              label="Thời gian đo"
                              type='date'
                              name='mesurementTime'
                              value={data.mesurementTime}
                              onChange={handleChange}
                              sx={{mb:2}}
                              InputLabelProps={
                                    {
                                          shrink:true
                                    }
                              }
                              ></TextField>
                        </FormControl>
                            
                              <TextField
                              fullWidth
                              label = "Nhiệt độ(°C)"
                              type='number'
                              name='temperature'
                              value={data.temperature}
                              onChange={handleChange}
                              sx={{mb:2}}
                              >

                              </TextField>
                              <TextField
                              fullWidth
                              label = "Nồng độ muối"
                              type='number'
                              name='salinity'
                              value={data.salinity}
                              onChange={handleChange}
                              sx={{mb:2}}
                              >

                              </TextField>
                              <TextField
                              fullWidth
                              label = "Độ pH"
                              type='number'
                              name='ph'
                              value={data.ph}
                              onChange={handleChange}
                              sx={{mb:2}}
                              >

                              </TextField>
                              <TextField
                              fullWidth
                              label = "Nồng độ O2"
                              type='number'
                              name='o2'
                              value={data.o2}
                              onChange={handleChange}
                              sx={{mb:2}}
                              >
                              </TextField>
                              <TextField
                              fullWidth
                              label = "Nồng độ NO2"
                              type='number'
                              name='no2'
                              value={data.no2}
                              onChange={handleChange}
                              sx={{mb:2}}
                              >
                              </TextField>
                              <TextField
                              fullWidth
                              label = "Nồng độ NO3"
                              type='number'
                              name='no3'
                              value={data.no3}
                              onChange={handleChange}
                              sx={{mb:2}}
                              >
                              </TextField>
                              <TextField
                              fullWidth
                              label = "Nồng độ PO4"
                              type='number'
                              name='po4'
                              value={data.po4}
                              onChange={handleChange}
                              sx={{mb:2}}
                              >
                              </TextField>
                        </Grid>
              
                  </Form>
                 
            </Card>
      </Grid>
    </Container>
  )
}

export default AddWaterParam