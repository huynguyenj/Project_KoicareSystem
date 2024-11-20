import { Box, Paper, Typography } from '@mui/material'
import React from 'react'

function CalculateSalt() {
  return (
    <>
      <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      sx={{maxWidth:'750px', margin:'auto',padding:3}}
      >
        <Paper  sx={{ padding: 3, width: '100%' }}>
            <Typography variant='h5'>Tính toán lượng muối</Typography>
        </Paper>
      </Box>
    </>
  )
}

export default CalculateSalt