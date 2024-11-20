import { Card, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPondWaterParam } from '../../../api/pond_fish';

function ViewWaterParam() {
      const {id} = useParams();
      const [waterParam,setWaterParam] = useState({});

      useEffect(()=>{
            getWaterParam();
      },[])

      const getWaterParam = async()=>{
            try {
                 const data =  await getPondWaterParam(id)
                 setWaterParam(data)
            } catch (error) {
                  console.log(error)
            }
      }
  return (
    <div>
      <Card sx={{maxWidth:350, margin:'auto'}}>
            <CardContent>
                  <Typography>Thông số của hồ</Typography>
                  <Typography>{new Date(waterParam.measurementTime).toLocaleDateString}</Typography>
            </CardContent>
      </Card>
    </div>
  )
}

export default ViewWaterParam