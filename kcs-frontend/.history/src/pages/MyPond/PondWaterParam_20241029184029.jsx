import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAllHistory } from '../../api/payment'

function PondWaterParam() {
      const {id} = useParams()
      const [paramHistory, setParamHistory] = useState([])
      useEffect(()=>{
            getHistoryParam()
      },[])
      const getHistoryParam = async () =>{
            try {
                  const res = await getAllHistory(id)
                  


            } catch (error) {
                  console.log(error)
            }
      }

      const processDate = (data) =>{
            const formData = data.map(h =>{
                  const 
            })
      }
  return (
    <div>PondWaterParam</div>
  )
}

export default PondWaterParam