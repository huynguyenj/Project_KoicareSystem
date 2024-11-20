import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

function FishDevelopmentData() {
      const {id} = useParams()
      const [fishHistory,setFishHistory] = useState([])
      
  return (
    <div>FishDevelopmentData</div>
  )
}

export default FishDevelopmentData