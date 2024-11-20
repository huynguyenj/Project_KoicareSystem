import { Card, CardContent } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom'

function ViewWaterParam() {
      const {id} = useParams();

  return (
    <div>
      <Card>
            <CardContent>
                  <Typo
            </CardContent>
      </Card>
    </div>
  )
}

export default ViewWaterParam