import React from 'react'
import { useParams } from 'react-router-dom'

function FishDevelopmentData() {
      const {id} = useParams()
      const [fishHistory,setFishHistory] = 
  return (
    <div>FishDevelopmentData</div>
  )
}

export default FishDevelopmentData