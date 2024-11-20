import React, { useEffect, useState } from 'react'
import { getAllProductInShop } from '../../../api/product'
import { Paper, TableContainer } from '@mui/material'
import { SearchIcon } from 'lucide-react'

function ShowProducts() {
  const [products,setProducts] = useState([])
  const [displayProducts,setDisplayProducts] = useState([])
  const [query,setQuery] = useState('');
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

  const handleSearch = () =>{

  }
  return (
    <>
      <TableContainer component={Paper} sx={{mt:5}}>
        <SearchIcon>
          
        </SearchIcon>
      </TableContainer>
    </>
  )
}

export default ShowProducts