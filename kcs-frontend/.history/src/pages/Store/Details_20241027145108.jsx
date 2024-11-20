import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
  Breadcrumbs,
  Grid,
  Rating,
  IconButton,
  Container,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
// import { ShoppingCart, ArrowLeft } from "lucide-react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useCart } from "../Store/Cart";
import { getAProduct } from "../../api/product";
const products = [
  {
    id: 1,
    name: "Thức ăn cáo cấp cho cá Koi",
    price: "810.000đ",
    description: "Cám tăng màu cho các loại cá chép koi.",
    longDescription:
      "Thức ăn cao cấp này được đặc biệt thiết kế để tăng cường màu sắc và sức khỏe cho cá Koi. Chứa các thành phần dinh dưỡng cân bằng và các chất tăng cường màu sắc tự nhiên, giúp cá Koi của bạn phát triển màu sắc rực rỡ và duy trì sức khỏe tối ưu. Phù hợp cho tất cả các giai đoạn phát triển của cá Koi.",
    image:
      "https://sanvuontrucxinh.com/upload/hinh_bai_viet/tin_tuc_tong_hop/thuc_an_tang_truong_ca_koi.jpg",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 2,
    name: "Vệ sinh cho cá",
    price: "10.000đ",
    description: "Cám tăng màu cho các loại cá chép koi.",
    longDescription:
      "Thức ăn cao cấp này được đặc biệt thiết kế để tăng cường màu sắc và sức khỏe cho cá Koi. Chứa các thành phần dinh dưỡng cân bằng và các chất tăng cường màu sắc tự nhiên, giúp cá Koi của bạn phát triển màu sắc rực rỡ và duy trì sức khỏe tối ưu. Phù hợp cho tất cả các giai đoạn phát triển của cá Koi.",
    image:
      "https://images.unsplash.com/photo-1520301255226-bf5f144451c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    rating: 2.5,
    reviews: 50,
  },
  // Add more products as needed
];

const Detail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const product = products.find((p) => p.id === parseInt(id || "0"));
  const { addToCart } = useCart();

  if (!product) {
    return <Typography>Product not found</Typography>;
  }
  
  const getProduct = async ()=>{
    try {
      const res = await getAProduct(id)
    } catch (error) {
      co
    }
  }
  const handleAddToCart = () => {
    addToCart(product, quantity); // Pass the selected quantity
  };

  const handleMinusQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Decrease quantity but not below 1
  };

  const handlePlusQuantity = () => {
    setQuantity((prev) => prev + 1); // Increase quantity
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link
          to="/userhome/store"
          style={{ textDecoration: "none", color: "#1976d2" }}
        >
          Cửa hàng
        </Link>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: { xs: "100%", md: "50%" },
            height: "auto",
            objectFit: "cover",
          }}
          image={product.image}
          alt={product.name}
        />
        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 3,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              fontWeight="bold"
            >
              {product.name}
            </Typography>
            <Typography
              variant="h5"
              color="primary"
              gutterBottom
              fontWeight="bold"
            >
              {product.price}
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <Rating
                name="read-only"
                value={product.rating}
                precision={0.5}
                readOnly
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({product.reviews} đánh giá)
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" paragraph>
              {product.longDescription}
            </Typography>
          </Box>
          <Box>
            <Grid container alignItems="center" spacing={2} sx={{ mb: 2 }}>
              <Grid item>
                <IconButton onClick={handleMinusQuantity} size="small">
                  <RemoveIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography>{quantity}</Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={handlePlusQuantity} size="small">
                  <AddIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              onClick={() => handleAddToCart(product)}
              fullWidth
              sx={{ mb: 2 }}
            >
              Thêm vào giỏ hàng
            </Button>
            <Button
              component={Link}
              to="/userhome/store"
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              fullWidth
            >
              Quay lại cửa hàng
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Đánh giá sản phẩm
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá sản phẩm này!
        </Typography>
      </Box>
    </Container>
  );
};

export default Detail;
