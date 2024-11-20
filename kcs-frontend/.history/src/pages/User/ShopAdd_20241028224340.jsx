import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Card,
  Divider,
  CircularProgress,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function ShopAdd() {
  const [update, setUpdate] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    shopId: "",
    shopName: "",
    address: "",
    phone: "",
    email: "",
    contactInfo: "",
    status: true,
  });

  const validateFields = () => {
    const newErrors = {};
    if (!formData.shopName || formData.shopName.trim() === "") {
      newErrors.shopName = "Tên cửa hàng không được để trống";
    }
    if(!formData.address || formData.address.trim() ==""){
      newErrors.add
    }
    if (!formData.phone || !/^\d{10,11}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }
    if (!formData.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      setUpdate(true);
      try {
        // await addShop(formData); // Adjust with your addShop API function
        toast.success("Cửa hàng đã được thêm thành công!");
      } catch (error) {
        console.log(error);
        toast.error("Có lỗi xảy ra khi thêm cửa hàng.");
      } finally {
        setUpdate(false);
      }
    }
  };

  const style = {
    head: {
      textAlign: "center",
      fontSize: "40px",
      fontFamily: "Arial",
      padding: "0",
      margin: "0",
    },
    hr: {
      width: "800px",
      textAlign: "center",
      margin: "0px auto",
      borderTop: "2px solid #000000",
    },
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <Typography style={style.head} variant="h6">
        Thêm cửa hàng của tôi
      </Typography>
      <hr style={style.hr} />
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 5,
        }}
      >
        <Grid container spacing={5}>
          <Grid item xs={12} sm={8}>
            <Card sx={{ padding: 3, boxShadow: 6 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Tên cửa hàng"
                      name="shopName"
                      value={formData.shopName}
                      onChange={handleChange}
                      error={!!errors.shopName}
                      helperText={errors.shopName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Địa chỉ"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Số điện thoại"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      error={!!errors.phone}
                      helperText={errors.phone}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Thông tin liên hệ"
                      name="contactInfo"
                      value={formData.contactInfo}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.status}
                          onChange={handleChange}
                          name="status"
                        />
                      }
                      label="Trạng thái cửa hàng"
                    />
                  </Grid>
                </Grid>
                <Box sx={{ textAlign: "right", marginTop: 3 }}>
                  <Button variant="contained" color="success" type="submit" disabled={update}>
                    {update ? <CircularProgress color="inherit" /> : "Lưu"}
                  </Button>
                </Box>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ShopAdd;
