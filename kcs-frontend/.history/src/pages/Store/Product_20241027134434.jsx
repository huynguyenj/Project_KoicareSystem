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

// const products = [
//   {
//     id: 1,
//     name: "Thức ăn cao cấp cho cá Koi",
//     price: "810.000đ",
//     description: "Cám tăng màu cho các loại cá chép koi.",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkPxVLmPOdZgPqdqKeqmviTb5aS4MJju5Yrw&s",
//     rating: 4.5,
//     inStock: true,
//     category: "Thức ăn",
//   },
//   {
//     id: 2,
//     name: "Bột vệ sinh hồ cá",
//     price: "20.000đ",
//     description:
//       "Sản phẩm giúp làm trong nước hồ cá nhanh chóng. Sử dụng khi nước đục.",
//     image:
//       "https://images.unsplash.com/photo-1520301255226-bf5f144451c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
//     rating: 4.0,
//     inStock: true,
//     category: "Dụng cụ",
//   },
//   {
//     id: 3,
//     name: "Vemedim Trimesul cá",
//     price: "375.000đ",
//     description: "Phòng các bệnh nhiễm khuẩn cho cá nuôi nước ngọt, gói 1kg",
//     image:
//       "https://images.unsplash.com/photo-1535591273668-578e31182c4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
//     rating: 4.2,
//     inStock: false,
//   },
//   {
//     id: 4,
//     name: "Vợt kim cương bắt cá Koi",
//     price: "350.000đ",
//     description: "Giúp bảo vệ cá trong quá trình chăm sóc cá.",
//     image:
//       "https://images.unsplash.com/photo-1513039464749-94912b3841ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
//     rating: 4.8,
//     inStock: true,
//   },
//   {
//     id: 5,
//     name: "BACTEVIT @",
//     price: "375.000đ",
//     description:
//       "Bổ sung các vitamin và các vi sinh vật có lợi, cá tiêu hóa tốt, giảm hệ số thức ăn, tăng đề kháng, tăng tỷ lệ sống.",
//     image:
//       "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
//     rating: 4.3,
//     inStock: true,
//   },
//   {
//     id: 6,
//     name: "Extra BIO - Vi Sinh Làm Sạch Nước",
//     price: "20.000đ",
//     description:
//       "Hạn chế rêu, không gây hại cho cá. Cải thiện quá trình trao đổi chất của cá.",
//     image:
//       "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2314&q=80",
//     rating: 4.1,
//     inStock: true,
//   },
//   {
//     id: 7,
//     name: "BIO - Vi Sinh Làm Sạch Nước",
//     price: "50.000đ",
//     description:
//       "Hạn chế rêu, không gây hại cho cá. Cải thiện quá trình trao đổi chất của cá.",
//     image:
//       "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2314&q=80",
//     rating: 4.1,
//     inStock: true,
//   },
//   // ...more products
// ];

const Product = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const productsPerPage = 6;
  // const [sortOrder, setSortOrder] = useState("asc");
  const pageCount = Math.ceil(products.length / productsPerPage);
  const [searchTerm, setSearchTerm] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const { addToCart } = useCart();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Track the product for confirmation dialog
  const [quantity, setQuantity] = useState(1); // State for quantity
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [productsList,setProductList] = useState([])
  const [products,setProducts] = useState([{
    id:"",
    name:"",
    price:0,
    description:"",
    image:"",
    inStock:"",
    category:""
  }])
  useEffect(()=>{
    getProducts();
  },[])

  useEffect(()=>{
    setProducts([{
      id :products.productId || '',
      name: products.productName ||'',
      price: products.price || '',
      description:products.description ||''

    }]
    )
  },[productsList])

  const getProducts = async () =>{
    try {
      const res = getAllProduct()
      setProductList(res.result)
    } catch (error) {
      console.log(error)
    }
  }
  const handleChange = (event, value) => {
    setPage(value);
  };

  // const toggleSortOrder = () => {
  //   setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  // };

  // const handleAddToCart = (product) => {
  //   setSelectedProduct(product); // Set the selected product
  //   setOpenDialog(true); // Open the confirmation dialog
  // };

  const confirmAddToCart = () => {
    addToCart(selectedProduct); // Add product to cart after confirmation
    setOpenDialog(false); // Close the dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog without adding to cart
  };

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) => !inStockOnly || product.inStock)
    .filter((product) => {
      const price = parseInt(product.price.replace(/[,.đ]/g, ""));
      return price >= minPrice && price <= maxPrice;
    })
    .filter(
      (product) =>
        selectedCategory === "All" || product.category === selectedCategory
    );


  const handleQuantityChange = (operation) => {
    setQuantity((prevQuantity) =>
      operation === "increase"
        ? prevQuantity + 1
        : Math.max(1, prevQuantity - 1)
    );
  };

  const displayedProducts = filteredProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  return (
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
          <option value="Thức ăn">Thức ăn</option>
          <option value="Vệ sinh hồ">Vệ sinh hồ</option>
          <option value="Thuốc">Thuốc</option>
          <option value="Dụng cụ">Dụng cụ</option>
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
                      {product.name}
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
                        {product.price}
                      </Typography>
                      <Chip
                        label={product.inStock ? "Còn hàng" : "Hết hàng"}
                        color={product.inStock ? "success" : "error"}
                        size="small"
                      />
                    </Box>
                    <Rating
                      name="read-only"
                      value={product.rating}
                      precision={0.1}
                      readOnly
                      size="small"
                    />
                  </CardContent>
                </CardActionArea>
                <Box sx={{ p: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCartIcon />}
                    fullWidth
                    disabled={!product.inStock}
                    component={Link}
                    to={`/userhome/store/${product.id}`}
                  >
                    {product.inStock ? "MUA NGAY" : "Hết hàng"}
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
  );
};

export default Product;
