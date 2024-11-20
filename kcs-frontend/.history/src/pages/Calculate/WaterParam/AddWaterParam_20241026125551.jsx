import { Card, Container, FormControl, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'


function AddWaterParam() {
      const [data,setDate] = useState({});

      const handleChange = (e) =>{
            const paramData = {}
            
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
                              InputLabelProps={
                                    {
                                          shrink:true
                                    }
                              }
                              ></TextField>
                        </Grid>
                  </FormControl>
            </Card>
      </Grid>
    </Container>
  )
}

export default AddWaterParam