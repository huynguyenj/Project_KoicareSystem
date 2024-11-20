import { Card, CardContent, Typography } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom'

function ViewWaterParam() {
      const {id} = useParams();

  return (
    <div>
      <Card sx>
            <CardContent>
                  <Typography>Thông số của hồ</Typography>
            </CardContent>
      </Card>
    </div>
  )
}

export default ViewWaterParam