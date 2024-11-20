import { useEffect, useState } from 'react';
import { InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton, TablePagination, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Edit, Delete, Search as SearchIcon, Save } from '@mui/icons-material';
import { deleteProduct, getAllProductInShop, updateProduct } from '../../../api/product';

const ShowProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayProducts, setDisplayProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedData, setEditedData] = useState({});
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
      product.productName.toLowerCase().includes(query.toLowerCase())
    );
    setDisplayProducts(filtered);
  };

  const handleEditClick = (product) => {
    setEditingProductId(product.id);
    setEditedData(product); // Initialize with existing product data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (productId) => {
    try {
      const formData = new FormData()
      formData.append("productName",editedData.productName)
      formData.append("price",editedData.price)
      formData.append("catogory",editedData.category)
      formData.append("quantity",editedData.quantity)
      if(formData.image instanceof File){
        formData.append("image",formData.image)
      }
      formData.append("description",formData.description)
      console.log(products.category)
      console.log(editedData)
      await updateProduct(productId, formData);
      fetchProducts(); // Refresh products to show updates
      setEditingProductId(null); // Exit edit mode
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const checked = window.con("Bạn có chắc bạn muốn xóa!")
      if(checked){
        console.log("hello")
        return;
      }
      console.log("hello")
      // await deleteProduct(productId);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 5 }}>
        <Paper component="form" sx={{ display: 'flex', alignItems: 'center', mb: 2, padding: '0 10px' }}>
          <SearchIcon />
          <InputBase
            placeholder="Search products"
            sx={{ ml: 1, flex: 1 }}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Paper>
        <Table sx={{ minWidth: 650 }} aria-label="products table">
          <TableHead sx={{ backgroundColor: 'orange', '& .MuiTableCell-root': { color: 'white', fontWeight: 'bold' } }}>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayProducts.length > 0 ? displayProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
              <TableRow key={product.id}>
                <TableCell align="center">
                  {editingProductId === product.id ? (
                    <InputBase
                      name="productName"
                      value={editedData.productName}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.productName
                  )}
                </TableCell>
                <TableCell align="center">
                  <img src={product.image} style={{ width: '100px' }} alt="" />
                </TableCell>
                <TableCell align="center">
                  {editingProductId === product.id ? (
                    <InputBase
                      name="price"
                      value={editedData.price}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.price
                  )}
                </TableCell>
                <TableCell align="center">
                  {editingProductId === product.id ? (
                    <InputBase
                      name="quantity"
                      value={editedData.quantity}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.quantity
                  )}
                </TableCell>

                <TableCell align="center">
                  {editingProductId === product.id ? (
                    <FormControl variant="outlined" fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={editedData.category}
                      onChange={handleInputChange}
                    >
                      
                        <MenuItem value="FOOD">
                         FOOD
                        </MenuItem>
                         
                        <MenuItem value="EQUIPMENT">
                         EQUIPMENT
                        </MenuItem>

                    </Select>
                  </FormControl>
                  ) : (
                    product.category
                  )}
                </TableCell>
                <TableCell align="center">
                  {editingProductId === product.id ? (
                    <IconButton color="primary" onClick={() => handleSave(product.id)}>
                      <Save />
                    </IconButton>
                  ) : (
                    <IconButton color="primary" onClick={() => handleEditClick(product)}>
                      <Edit />
                    </IconButton>
                  )}
                  <IconButton color="secondary" onClick={() => handleDelete(product.id)}>
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
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </TableContainer>
    </>
  );
};

export default ShowProducts;
