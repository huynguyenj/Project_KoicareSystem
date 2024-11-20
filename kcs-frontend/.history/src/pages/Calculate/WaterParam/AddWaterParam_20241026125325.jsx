import { Card, Container, FormControl, Grid, TextField } from '@mui/material'
import React from 'react'


function AddWaterParam() {
  return (
    <Container>
      <Grid item xs={12} sm={8}>
            <Card sx={{padding:5}}>
                  <FormControl>
                        <Grid item xs={12} sm={8}>
                              <TextField
                              fullWidth
                              label="Thời gian đo"
                              typ
                              ></TextField>
                        </Grid>
                  </FormControl>
            </Card>
      </Grid>
    </Container>
  )
}

export default AddWaterParam