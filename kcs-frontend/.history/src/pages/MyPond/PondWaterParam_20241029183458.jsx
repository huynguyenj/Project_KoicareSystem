import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function PondWaterParam() {
      const {id} = useParams()
      const [paramHistory, setParamHistory] = useState()
      useEffect(()=>{

      },[])
      const getHistoryParam = () =>{
            try {
                  const res = await getHis
            } catch (error) {
                  console.log(error)
            }
      }
  return (
    <div>PondWaterParam</div>
  )
}

export default PondWaterParam