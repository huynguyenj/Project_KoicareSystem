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

                  </Form>
                 
            </Card>
      </Grid>
    </Container>
  )
}

export default AddWaterParam