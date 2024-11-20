import React, { useEffect, useState } from 'react'
import { getAllProductInShop } from '../../../api/product'

function ShowProducts() {
  const [products,setProducts] = useState([])

  useEffect(()=>{
    
  },[])
  
  const getProducts = async ()=>{
    try {
      const res = await getAllProductInShop()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>ShowProducts</div>
  )
}

export default ShowProducts