import React, { useEffect, useState } from "react";
import { getAllProductInShop } from "../../../api/product";
import { InputBase, Paper, TableContainer } from "@mui/material";
import { SearchIcon } from "lucide-react";

function ShowProducts() {
  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await getAllProductInShop();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    const search = 
  };
  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 5}}>
        <SearchIcon>
        </SearchIcon>
          <InputBase
            placeholder="search"
            inputProps={{ "aria-label": "search" }}
            sx={{ mt:2 ,mb: 2 }}
            value={query}
            onChange={handleSearch}

          ></InputBase>
       
      </TableContainer>
    </>
  );
}

export default ShowProducts;
