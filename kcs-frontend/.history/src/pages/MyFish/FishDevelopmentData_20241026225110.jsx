import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function FishDevelopmentData() {
      const {id} = useParams()
      const [fishHistory,setFishHistory] = useState([])

      useEffect(()=>{

      },[])

      const getFishDevelopmentHistory =  async () =>{
            try {
                  await getFish
            } catch (error) {
                  
            }
      }
  return (
    <div>FishDevelopmentData</div>
  )
}

export default FishDevelopmentData