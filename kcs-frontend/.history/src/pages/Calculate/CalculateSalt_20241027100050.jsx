import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'

function CalculateSalt() {
      const [ponds,setPonds]= useState([]);
      
  return (
    <>
      <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      sx={{maxWidth:'750px', margin:'auto',padding:3}}
      >
        <Paper elevation={5} sx={{ padding: 3, width: '100%' }}>
            <Typography variant='h5' align='center'>Tính toán lượng muối</Typography>

        </Paper>
      </Box>
    </>
  )
}

export default CalculateSalt