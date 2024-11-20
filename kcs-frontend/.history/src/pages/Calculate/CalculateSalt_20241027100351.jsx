import { Box, FormControl, InputLabel, Paper, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { getAllPond } from '../../api/pond_fish';

function CalculateSalt() {
      const [ponds,setPonds]= useState([]);

      useEffect(()=>{

      },[])

      const getPonds = async ()=>{
        try {
            const res = await getAllPond()
            setPonds(res.result)
        } catch (error) {
          console.log(error)
        }
      }

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
            <FormControl>
                <InputLabel>Choon</InputLabel>
            </FormControl>
        </Paper>
      </Box>
    </>
  )
}

export default CalculateSalt