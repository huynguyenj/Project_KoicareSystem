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
    
    </>
   
  );
};

export default Product;
