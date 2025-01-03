import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardContent,
  Divider,
  IconButton,
  Switch,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import { ChevronLeft } from "lucide-react";
// import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Store/Cart";
import Footer from "../../components/Footer/Footer1";

const Payment = () => {
  const { cartItems, calculateTotalPrice, removeFromCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState({});
  const [formData, setFormData] = useState({
    quantity:"",
    price:"",
    userName: "",
    address: "",
    phone: "",
    date : new Date()
  
  });

  useEffect(() => {
    console.log(cartItems);
  }, []);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const shipping = 48000; // Updated shipping fee
    return subtotal + shipping;
  };

  const handleCheckout = async () => {
    setLoading(true);
    const orderDetail = cartItems.map(item =>({
      productId: item.product.id,
      quantity: item.quantity
    }))
    console.log(orderDetail)
    const form = {
      useName: formData.userName,
      address: formData.address,
      phone: formData.phone,
      data: formData.date,
      order: orderDetail
    }
    console.log(form)
    try {
      console.log(formData)
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
     
  };

  const navigate = useNavigate();

  function backtoStore() {
    navigate("/userhome/store");
  }
  // Total
  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const getNumericPrice = (priceString) => {
    console.log(priceString);
    return priceString;
  };

  const validate = () =>{
    const newError = {}
    if(!formData.userName || formData.userName.trim() ==""){
      newError.name = "Hãy nhập tên của bạn!"
    }
    if(!formData.phone || formData.phone.trim()==""){
      newError.phone = "H"
    }
  }

  return (
    <>
      <Box p={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="back"
              sx={{
                mr: 2,
                mb: 2,
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateX(-1px)",
                  "& .backText": {
                    textDecoration: "underline",
                  },
                },
              }}
              onClick={backtoStore}
            >
              <ChevronLeft />
              <Typography className="backText" sx={{ fontSize: "20px" }}>
                Quay lại cửa hàng
              </Typography>
            </IconButton>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Thông tin cá nhân
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Họ và tên"
                      name="userName"
                      value={formData.userName}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Số điện thoại"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                        label="Địa chỉ"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        fullWidth
                        required
                      />
                    </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Box mt={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Phương thức thanh toán
                  </Typography>
                  <RadioGroup
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    row
                  >
                    <FormControlLabel
                      value="cod"
                      control={<Radio />}
                      label="Tiền mặt"
                    />
                    <FormControlLabel
                      value="credit"
                      control={<Radio />}
                      label="Thanh toán online"
                    />
                  </RadioGroup>

                  {paymentMethod === "credit" && (
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          name="cardholderName"
                          value={formData.cardholderName}
                          onChange={handleInputChange}
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CreditCardIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Card Number"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          fullWidth
                          type="number"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Switch />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="EXP Date"
                          name="expDate"
                          value={formData.expDate}
                          onChange={handleInputChange}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="CVC"
                          name="cvc"
                          value={formData.cvc}
                          onChange={handleInputChange}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  )}
                </CardContent>
              </Card>
            </Box>
          </Grid>

          <Grid item xs={12} md={4} mt={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Sản phẩm
                </Typography>

                {cartItems.map((item) => (
                  <Box
                    key={item.product.id}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box display="flex" alignItems="center">
                      <Box
                        component="img"
                        sx={{
                          width: 50,
                          height: 50,
                          objectFit: "cover",
                          borderRadius: 1,
                          mr: 2,
                          mb: 2,
                        }}
                        src={item.product.image}
                        alt={item.product.name}
                      ></Box>
                      <Tooltip  title={item.product.productName} arrow>
                      <Typography
                        sx={{
                          maxWidth: 150, // Adjust this value as needed
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.product.productName}
                      </Typography>
                      </Tooltip>
                      
                    </Box>
                    <Box>
                      <Typography>
                        {getNumericPrice(item.product.price).toLocaleString(
                          "vi-VN"
                        )}{" "}
                        VND x {item.quantity || 0}
                        <IconButton
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Typography>
                    </Box>
                  </Box>
                ))}

                <Divider sx={{ my: 2 }} />

                <Box display="flex" justifyContent="space-between">
                  <Typography fontWeight="bold">Tổng số tiền: </Typography>
                  <Typography fontWeight="bold">
                    {formatPrice(calculateTotalPrice())}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  {loading ? "Đang thanh toán..." : "Thanh toán"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default Payment;
