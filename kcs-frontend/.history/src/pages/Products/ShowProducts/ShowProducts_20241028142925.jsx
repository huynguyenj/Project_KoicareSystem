import React, { useEffect, useState } from 'react'
import { getAllProductInShop } from '../../../api/product'
import { TableContainer } from '@mui/material'

function ShowProducts() {
  const [products,setProducts] = useState([])
  const [displayProducts,setDisplayProducts] = useState([])
  useEffect(()=>{
    getProducts();
  },[])
  
  const getProducts = async ()=>{
    try {
      const res = await getAllProductInShop()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <TableContainer component={pa}>

      </TableContainer>
    </>
  )
}

export default ShowProducts