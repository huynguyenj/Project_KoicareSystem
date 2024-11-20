import { useEffect, useState } from 'react';
import { InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, TablePagination, IconButton } from '@mui/material';

import { Edit, Delete, Search as SearchIcon } from '@mui/icons-material';
import { deleteProduct, getAllProductInShop, updateProduct } from '../../../api/product';

const ShowProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayProducts, setDisplayProducts] = useState([]);
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getAllProductInShop();
      setProducts(res);
      setDisplayProducts(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setDisplayProducts(filtered);
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      setDisplayProducts(displayProducts.filter(product => product.id !== productId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (productId, newData) => {
    try {
      // await updateProduct(productId, newData);
      fetchProducts(); // Refresh data after update
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 5 }}>
        <InputBase
          placeholder="Search products"
          sx={{ mb: 2 }}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Table sx={{ minWidth: 650 }} aria-label="products table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Product ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align='center'>Hình ảnh</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayProducts.length > 0 ? displayProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
              <TableRow key={product.id}>
                <TableCell align="center">{product.id}</TableCell>
                <TableCell align="center">{product.name}</TableCell>
                <TableCell align="center"><img src={product.image} style={{wi}} alt="" /></TableCell>
                <TableCell align="center">{product.price}</TableCell>
                <TableCell align="center">{product.quantity}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleEdit(product.id, { /* new data for update */ })}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(product.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="h6">No products found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[6, 12, 18]}
          component="div"
          count={displayProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        />
      </TableContainer>
    </>
  );
};

export default ShowProducts;
