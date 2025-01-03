import React, { useEffect, useState } from 'react'
import { getShopInfo } from '../../api/shop'
import { Box, TextField, Typography } from '@mui/material'

function UpdateShopInfo() {
      const [shopInfo,setShopInfo] = useState({})
      const [edit,setEdit] = useState(false)
      
      useEffect(()=>{
            getInfo();
      },[])

      const getInfo = async () =>{
            try {
                  const res = await getShopInfo()
                  setShopInfo(res.result)
            } catch (error) {
                  console.log(error)
            }
      }
  return (
    <div>
      <Box>
            {edit ? 
            <>
             <TextField></TextField>
            </>
                 
            :
                  <Typography>{shopInfo.shopName}</Typography>
            }
      </Box>

    </div>
  )
}

export default UpdateShopInfo