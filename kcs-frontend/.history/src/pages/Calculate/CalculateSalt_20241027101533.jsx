import { Box, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { getAllPond } from '../../api/pond_fish';

function CalculateSalt() {
      const [ponds,setPonds]= useState([]);
      const [pondId,setPondId]
      useEffect(()=>{
        getPonds()
      },[])

      const getPonds = async ()=>{
        try {
            const res = await getAllPond()
            setPonds(res.result)
        } catch (error) {
          console.log(error)
        }
      }

      const handleChange = (pondId) =>{
        const pondChose = ponds.find(p => p.pondId == pondId)

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
            <FormControl fullWidth margin='normal'>
                <InputLabel>Chọn hồ cá</InputLabel>
                <Select
                  value={ponds.pondName}
                  onChange={}
                >
                     {ponds.length > 0? (ponds.map((pond)=>(
                      <MenuItem key={pond.pondId}>{pond.pondName}</MenuItem>
                     ))):<MenuItem>Không có dữ liệu</MenuItem>}
                </Select>
            </FormControl>
        </Paper>
      </Box>
    </>
  )
}

export default CalculateSalt