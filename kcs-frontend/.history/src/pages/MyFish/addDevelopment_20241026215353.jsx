import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getFishInfo } from '../../api/pond_fish';

function addDevelopment() {
      const {id} = useParams();
      const [fish,setFish] = useState();
      const [age,setAge] = useState(0)
      const getFish =  async ()=>{
            try {
                  const res = await getFishInfo(id)
                  setFish(res.result)
            } catch (error) {
                  console.log(error)
            }
      }
  return (
    <div>

    </div>
  )
}

export default addDevelopment