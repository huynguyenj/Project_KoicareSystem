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

const Detail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const [product, setProduct] = useState({});

  useEffect(() => {
    getProduct();
  });
  if (!product) {
    return <Typography>Product not found</Typography>;
  }

  const getProduct = async () => {
    try {
      const res = await getAProduct(id);
      setProduct(res);
    } catch (error) {
      console.log(error);
    }
  };
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
              {product.productName}
            </Typography>
            <Typography
              variant="h5"
              color="primary"
              gutterBottom
              fontWeight="bold"
            >
              {product.price
                ? product.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })
                : "Loading..."}
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <Rating
                name="read-only"
                value={product.rating}
                precision={0.5}
                readOnly
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                (Loại: {product.category})
              </Typography>
             
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({product.reviews} đánh giá)
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
      
      <Box sx={{mt:5}}>
      <Typography 
      variant="h4" 
      sx={{mb:2,alignItems:'center',alignContent:'center'}} 
      bgcolor={"ButtonShadow"} 
      color="info" 
      height={90} >
        Mô tả sản phẩm</Typography>
      <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              dangerouslySetInnerHTML={{
                __html: product.description
                  ? product.description.replace(/\r\n/g, "<br />")
                  : "Loading...",
              }}
            />
      </Box>
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
