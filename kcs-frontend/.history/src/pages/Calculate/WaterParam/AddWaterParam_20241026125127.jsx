import { Card, FormControl, Grid, TextField } from '@mui/material'
import React from 'react'


function AddWaterParam() {
  return (
    <div>
      <Grid item xs={12} sm={8}>
            <Card>
                  <FormControl>
                        <Grid item xs={12} sm={8}>
                              <TextField></TextField>
                        </Grid>
                  </FormControl>
            </Card>
      </Grid>
    </div>
  )
}

export default AddWaterParam