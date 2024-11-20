import { useEffect, useState } from "react";
import {
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import {
  Edit,
  Delete,
  Search as SearchIcon,
  Save,
  ArrowBack,
} from "@mui/icons-material";
import { deleteProduct, getAllProductInShop, updateProduct } from "../../../api/product";

const ShowProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayProducts, setDisplayProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [imageReview, setImageReview] = useState(null);
  const [sortOption, setSortOption] = useState("");

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
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(query.toLowerCase())
    );
    setDisplayProducts(filtered);
  };

  const handleSort = (e)=>{
    const option = e.target.value;
    setSortOption(option);
    const sortProducts = [...displayProducts].sort((a,b)=>{
      if(option =="priceAsc"){
        return a.price-b.price
      }else if(option =="priceDesc"){
        return b.price - a.price
      }if(option == "dateAsc"){
        return new Date(a.createAt) - new Date(b.createAt)
      }else if(option == "dateDesc"){
        return new Date(b.createAt) - new Date(a.createAt)
      }
      return 0;
    });
      setDisplayProducts(sortProducts)
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditedData({ ...editedData, image: file });
    const reader = new FileReader();
    reader.onload = () => {
      setImageReview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleEditClick = (product) => {
    setEditingProductId(product.id);
    setEditedData(product);
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
      const formData = new FormData();
      formData.append("productName", editedData.productName);
      formData.append("price", editedData.price);
      formData.append("category", editedData.category);
      formData.append("quantity", editedData.quantity);
      if (formData.image instanceof File) {
        formData.append("image", formData.image);
      }
      formData.append("description", formData.description);
      await updateProduct(productId, formData);
      fetchProducts();
      setEditingProductId(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const checked = window.confirm("Are you sure you want to delete this product?");
      if (!checked) return;
      await deleteProduct(productId);
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
      <TableContainer component={Paper} sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3,
            backgroundColor: "#f3f3f3",
            borderRadius: 2,
            boxShadow: 1,
            width:'400px',
            p:1
            
          }}
          
        >
         
          <InputBase
            startAdornment={ <SearchIcon color="primary" sx={{mr:1}} /> }
            placeholder="Search products"
            sx={{ ml: 1, flex: 1 ,border:'none'}}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Button variant="contained" onClick={()=>fetchProducts()}>Tải lại</Button>
        </Paper>
        <Table sx={{ minWidth: 700 }} aria-label="products table">
          <TableHead
            sx={{
              backgroundColor: "orange",
              "& .MuiTableCell-root": { color: "white", fontWeight: "bold" },
            }}
          >
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
            {displayProducts.length > 0 ? (
              displayProducts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product) => (
                  <TableRow key={product.id} hover>
                    <TableCell align="center">
                      {editingProductId === product.id ? (
                        <InputBase
                          name="productName"
                          value={editedData.productName}
                          onChange={handleInputChange}
                          sx={{ p: 0.5 }}
                        />
                      ) : (
                        product.productName || "No name"
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editingProductId === product.id ? (
                        <>
                          <input type="file" accept="image/*" onChange={handleImageChange} />
                          {imageReview && (
                            <img
                              src={imageReview}
                              alt="Preview"
                              style={{ width: 100, height: 100, marginTop: 5, borderRadius: "8px" }}
                            />
                          )}
                        </>
                      ) : (
                        <img
                          src={product.image}
                          alt={product.productName}
                          style={{ width: 80, height: 80, borderRadius: "8px" }}
                        />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editingProductId === product.id ? (
                        <InputBase
                          name="price"
                          value={editedData.price}
                          onChange={handleInputChange}
                          sx={{ p: 0.5 }}
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
                          sx={{ p: 0.5 }}
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
                            <MenuItem value="FOOD">FOOD</MenuItem>
                            <MenuItem value="EQUIPMENT">EQUIPMENT</MenuItem>
                          </Select>
                        </FormControl>
                      ) : (
                        product.category
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editingProductId === product.id ? (
                        <>
                          <IconButton color="primary" onClick={() => handleSave(product.id)}>
                            <Save />
                          </IconButton>
                          <IconButton color="primary" onClick={() => setEditingProductId(null)}>
                            <ArrowBack />
                          </IconButton>
                        </>
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
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
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
          sx={{ display: "flex", justifyContent: "center", mt: 2 }}
        />
      </TableContainer>
    </>
  );
};

export default ShowProducts;
