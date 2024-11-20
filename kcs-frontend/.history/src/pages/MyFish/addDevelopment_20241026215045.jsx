import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getFishInfo } from '../../api/pond_fish';

function addDevelopment() {
      const {id} = useParams();
      const [fish,setFish] = useState();

      const getFish =  async ()=>{
            try {
                  const res = await getFishInfo(id)
                  setFish(res.result)
            } catch (error) {
                  
            }
      }
  return (
    <div>

    </div>
  )
}

export default addDevelopment