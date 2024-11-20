import { Card, FormControl, Grid, TextField } from '@mui/material'
import React from 'react'


function AddWaterParam() {
  return (
    <Contain>
      <Grid item xs={12} sm={8}>
            <Card sx={{padding:5}}>
                  <FormControl>
                        <Grid item xs={12} sm={8}>
                              <TextField></TextField>
                        </Grid>
                  </FormControl>
            </Card>
      </Grid>
    </Contain>
  )
}

export default AddWaterParam