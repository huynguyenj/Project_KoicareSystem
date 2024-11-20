import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getFishHistory } from '../../api/pond_fish'

function FishDevelopmentData() {
      const {id} = useParams()
      const [fishHistory,setFishHistory] = useState([])

      useEffect(()=>{

      },[])

      const getFishDevelopmentHistory =  async () =>{
            try {
                  await getFishHistory(id)
                  
            } catch (error) {
                  
            }
      }
  return (
    <div>FishDevelopmentData</div>
  )
}

export default FishDevelopmentData