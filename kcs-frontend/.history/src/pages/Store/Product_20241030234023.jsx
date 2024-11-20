import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Button,
  Box,
  Pagination,
  Rating,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
// import SortIcon from "@mui/icons-material/Sort";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../Store/Cart";
import { getAllProduct } from "../../api/product";
import Footer from "../../components/Footer/Footer1";

const Product = () => {
  // const { id } = useParams();
  const [page, setPage] = useState(1);
  const productsPerPage = 6;
  // const [sortOrder, setSortOrder] = useState("asc");
  // const pageCount = Math.ceil(products.length / productsPerPage);
  const [searchTerm, setSearchTerm] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const { addToCart } = useCart();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Track the product for confirmation dialog
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [productsList, setProductList] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await getAllProduct();
      setProductList(res);
      console.log(productsList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };
  const confirmAddToCart = () => {
    addToCart(selectedProduct); // Add product to cart after confirmation
    setOpenDialog(false); // Close the dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog without adding to cart
  };

  const filteredProducts = Array.isArray(productsList)
    ? productsList
        .filter((product) =>
          product.productName != null ? product.productName.toLowerCase().includes(searchTerm.toLowerCase()):''
        )
        .filter((product) => !inStockOnly || product.quantity > 0)
        .filter(
          (product) => product.price >= minPrice && product.price <= maxPrice
        )
        .filter(
          (product) =>
            selectedCategory === "All" || product.category === selectedCategory
        )
    : [];

  const displayedProducts = filteredProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  return (
    <>
     <Container maxWidth="lg" sx={{ mt: 1, mb: 4 }}>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: theme.palette.primary.main,
          borderBottom: `2px solid ${theme.palette.primary.main}`,
          paddingBottom: "10px",
          textAlign: "center",
          mb: 4,
        }}
      >
        Cửa hàng
      </Typography>

      {/* Filters Section */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center",
        }}
      >
        {/* Search Product */}
        <TextField
          label="Tìm kiếm sản phẩm"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          sx={{ flexGrow: 1, minWidth: "180px" }}
        />

        {/* InStock Filter */}
        <FormControlLabel
          control={
            <Checkbox
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
            />
          }
          label="Hiển thị sản phẩm còn hàng"
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: "14px", // Set your desired font size here
            },
          }}
        />

        {/* Min Price Filter */}
        <TextField
          label="Giá tối thiểu"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          size="small"
          sx={{ minWidth: "130px" }}
        />

        {/* Max Price Filter */}
        <TextField
          label="Giá tối đa"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          size="small"
          sx={{ minWidth: "130px" }}
        />

        {/* Category Filter */}
        <TextField
          label="Chọn danh mục"
          select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          SelectProps={{
            native: true,
          }}
          size="small"
          sx={{ minWidth: "150px" }}
        >
          <option value="All">Tất cả</option>
          <option value="FOOD">Thức ăn</option>
          <option value="EQUIPMENT">Dụng cụ</option>
        </TextField>
      </Box>

      <Grid container spacing={3}>
        {displayedProducts.length > 0 ? (
          displayedProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <CardActionArea
                  component={Link}
                  to={`/userhome/store/${product.id}`}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={product.image}
                    alt={product.name}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom noWrap>
                      {product.productName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Danh mục: {product.category}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        height: 40,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {product.description}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography variant="h6" color="primary">
                        {product.price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </Typography>
                      <Chip
                        label={product.quantity > 0 ? "Còn hàng" : "Hết hàng"}
                        color={product.quantity > 0 ? "success" : "error"}
                        size="small"
                      />
                    </Box>
                    {/* <Rating
                      name="read-only"
                      value={product.rating}
                      precision={0.1}
                      readOnly
                      size="small"
                    /> */}
                    <Typography>Số lượng sản phẩm: {product.quantity}</Typography>
                  </CardContent>
                </CardActionArea>
                <Box sx={{ p: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCartIcon />}
                    fullWidth
                    disabled={product.price <= 0}
                    component={Link}
                    to={`/userhome/store/${product.id}`}
                  >
                    {product.price >= 0 ? "MUA NGAY" : "Hết hàng"}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center", width: "100%" }}>
            Không có sản phẩm nào phù hợp với bộ lọc.
          </Typography>
        )}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={Math.ceil(filteredProducts.length / productsPerPage)}
          page={page}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
          size={isSmallScreen ? "small" : "medium"}
        />
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Xác nhận</DialogTitle>
        <DialogContent>
          Bạn có muốn thêm sản phẩm {selectedProduct?.name} vào giỏ hàng không?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Hủy
          </Button>
          <Button
            onClick={confirmAddToCart}
            color="primary"
            variant="contained"
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
  
    </Container>
    <Footer/>
    </>
   
  );
};

export default Product;
