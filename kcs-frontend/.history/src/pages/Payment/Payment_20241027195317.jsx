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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    voucher: "",
    cardholderName: "",
    cardNumber: "",
    expDate: "",
    cvc: "",
  });

  useEffect(()=>{
      console.log(cartItems)
  },[])
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

    try {
      const orderData = {
        personalInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          country: formData.country,
        },
        cartItems,
        paymentMethod,
        total: calculateTotal(),
        voucher: formData.voucher,
      };

      const orderResponse = await axios.post("/api/orders/create", orderData);

      if (orderResponse.data.success) {
        if (paymentMethod === "credit") {
          const paymentData = {
            cardholderName: formData.cardholderName,
            cardNumber: formData.cardNumber,
            expDate: formData.expDate,
            cvc: formData.cvc,
            amount: calculateTotal(),
            orderId: orderResponse.data.orderId,
          };

          const paymentResponse = await axios.post(
            "/api/payment/process",
            paymentData
          );

          if (paymentResponse.data.success) {
            alert("Thanh toán thành công!");
          } else {
            alert("Thanh toán không thành công!");
          }
        } else {
          alert("Order created! You selected Cash on Delivery.");
        }
      } else {
        alert("Failed to create the order.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Thanh toán không thành công!");
    } finally {
      setLoading(false);
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
    console.log(priceString)
    return priceString;
  };

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
                    name="name"
                    value={formData.name}
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
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
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
                  Địa chỉ
                </Typography>
                <Grid container spacing={2}>
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Thành phố"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>

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
                        height: 60,
                        objectFit: "cover",
                        borderRadius: 1,
                        mr: 2,
                        mb: 2,
                      }}
                      src={item.product.image}
                      alt={item.product.name}
                    ></Box>
                    <Typography>{item.product.productName}</Typography>
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
    <Footer/>
    </>
  );
};

export default Payment;
