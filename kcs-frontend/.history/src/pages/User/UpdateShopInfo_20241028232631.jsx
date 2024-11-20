import React, { useEffect, useState } from 'react'
import { getShopInfo } from '../../api/shop'

function UpdateShopInfo() {
      const [shopInfo,setShopInfo] = useState({})
      const [edit,setEdit] = useState(false)
      
      useEffect(()=>{

      },[])

      const getInfo = async () =>{
            try {
                  const res = await getShopInfo()
                  set
            } catch (error) {
                  console.log(error)
            }
      }
  return (
    <div>UpdateShopInf</div>
  )
}

export default UpdateShopInfo