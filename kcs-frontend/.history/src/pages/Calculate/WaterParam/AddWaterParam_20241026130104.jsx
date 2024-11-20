import { Card, Container, FormControl, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'


function AddWaterParam() {
      const [data,setData] = useState({
            mesurementTime: "",
            temperature: 0,
            salinity:0,
            ph:0,
            o2: 0,
            no2:0,
            no3:0,
            po4:0
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
                              label = "Nhiệt độ"
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