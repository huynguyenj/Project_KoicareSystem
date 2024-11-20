import React from 'react'
import { useParams } from 'react-router-dom'

function FishDevelopmentData() {
      const {id} = useParams()
      
  return (
    <div>FishDevelopmentData</div>
  )
}

export default FishDevelopmentData