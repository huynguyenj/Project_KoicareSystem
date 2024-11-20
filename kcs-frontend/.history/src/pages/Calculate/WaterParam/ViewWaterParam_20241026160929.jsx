import { Card, CardContent, Typography } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom'

function ViewWaterParam() {
      const {id} = useParams();
      const [waterParam,setWaterParam] = ()
  return (
    <div>
      <Card sx={{maxWidth:350, margin:'auto'}}>
            <CardContent>
                  <Typography>Thông số của hồ</Typography>
                  
            </CardContent>
      </Card>
    </div>
  )
}

export default ViewWaterParam