import { Box, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { getAllPond } from '../../api/pond_fish';

function CalculateSalt() {
      const [ponds,setPonds]= useState([]);
      const [pondChoice,setPondChoice] = useState({pondId: '', pondName: '', volume : 0})
      const [healthStatus,setHealthStatus] = useState("")
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
        setPondChoice(pondChose)
        console.log(pondChoice)
      }

      const handleHealthStatus = (e) =>{
        const health = e.target.value;
        setHealthStatus(health)

      }

      const calculateSaltDependOnHealth = ()=>{
       
        if(healthStatus =="normal"){
          return pondChoice.volume * 0.03
        }

        if(healthStatus =="recomend"){
          return pondChoice.volume* 0.05
        }

        if(healthStatus =="sick"){
          return pondChoice.volume* 0.07
        }
        else return;
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
                  value={pondChoice.pondId}
                  onChange={(e)=> handleChange(e.target.value)}
                >
                     {ponds.length > 0? (ponds.map((pond)=>(
                      <MenuItem key={pond.pondId} value = {pond.pondId}>{pond.pondName}</MenuItem>
                     ))):<MenuItem>Không có dữ liệu</MenuItem>}
                </Select>
            </FormControl >

                  
            <FormControl  fullWidth margin='normal'>
            <InputLabel>Tình trạng sức khỏe của cá</InputLabel>
                    <Select
                      value={healthStatus}
                      onChange={handleHealthStatus}
                    >
                        <MenuItem value="normal">Bình thường (0.3%)</MenuItem>
                        <MenuItem value ="recomend">Đề xuất (0.5%)</MenuItem>
                        <MenuItem value="sick"> Bị bệnh (0.7%)</MenuItem>
                    </Select>
            </FormControl>

                     {pondChoice.pondId? 
                     (
                      <Box mt={1} bgcolor="lightBlue" borderRadius={2}>
                          <Typography variant='h6'>Kết quả</Typography>
                          <Typography>Thể tích hồ của bạn: {pondChoice.volume}</Typography>
                          <Typography>Lượng muối cần thiết: {calculateSaltDependOnHealth  }</Typography>
                      </Box>
                     )
                     :("")
                    }
        </Paper>
      </Box>
    </>
  )
}

export default CalculateSalt