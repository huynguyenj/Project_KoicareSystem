import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getFishHistory } from '../../api/pond_fish'
import { LineChart } from '@mui/x-charts/LineChart';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function FishDevelopmentData() {
      const {id} = useParams()
      const [fishHistory,setFishHistory] = useState([])
      const [weight,setWeight] = useState([])
      const [size,setSize] = useState([])

      useEffect(()=>{
            getFishDevelopmentHistory();
      },[])

      const getFishDevelopmentHistory =  async () =>{
            try {
                const res = await getFishHistory(id)
                setFishHistory(res.result)
            } catch (error) {
                  console.log(error)
            }
      }
      const filterWeight = ()=>{
            const weight = fishHistory.filter(fishWeight=> fishWeight.weight)
            setWeight(weight)
      }
      
  return (
    <div>FishDevelopmentData</div>
  )
}

export default FishDevelopmentData