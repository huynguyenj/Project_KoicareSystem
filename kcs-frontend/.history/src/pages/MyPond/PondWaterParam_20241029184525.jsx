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
                  const no2 = parseFloat(h.no2)
                  const ph =  parseFloat(h.ph)
                  const o2 = parseFloat(h.o2)
                  const no3 = parseFloat(h.no3)
                  const po4 = parseFloat(h.po4)
                  const salinity = parseFloat(h.salinity)
                  const temperature = parseFloat(h.temperature)
                  const date = newDate(h.measurementTime)
            return{
                  no2:isNaN(no2)? 0 : no2,
                  ph: isNaN(ph)? 0 : ph
            }
            })
      }
  return (
    <div>PondWaterParam</div>
  )
}

export default PondWaterParam