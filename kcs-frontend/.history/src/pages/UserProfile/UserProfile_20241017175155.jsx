import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
 
  ShoppingCart,
  Lock,
} from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";
import { getMyInfo, updateInfo } from "../../api/userService";
import { ToastContainer, toast } from "react-toastify";


function UserProfile() {
  const [userInfo, setUserInfo] = useState({});
  const [formData, setFormData] = useState({
    userId: 0,
    userName: "",
    phone: "",
    email: "",
  });

  useEffect(()=>{
    getInfo();
   
  },[])

  async function getInfo() {
    
    try {
      
      const res = await getMyInfo();
      setUserInfo(res.result)

    } catch (error) {
      alert("Xảy ra sự cố khi lấy dữ liệu!")
      navigate("/")
      console.log(error)
    } 
  }



  useEffect(() => {
    // Update formData with userInfo values when userInfo changes
    if (userInfo) {
      setFormData({
        userId:userInfo.userId || "",
        userName: userInfo.userName || "",
        email: userInfo.email || "",
        phone: userInfo.phone || "",
        
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [errors, setErrors] = useState({ email: "", phone: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

         setErrors({ email: "", phone: "" }); // Reset errors

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        setErrors((prev) => ({ ...prev, email: "Vui lòng nhập đúng định dạng gmail có @." }));
        return;
    }

    // Validate phone number
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
        setErrors((prev) => ({ ...prev, phone: "Vui lòng nhập 10 chữ số." }));
        return;
    }
    console.log("Form submitted:", formData);
    await updateInfo(formData.userId,formData)
        .then(()=>toast.success("Thông tin của bạn đã được cập nhật thành công!"))
        .catch(()=> toast.error("Cập nhật thông tin không thành công!"))
  };

 
  const handleReset = () => {
    setFormData({
        userName: userInfo.userName || "",
        email: userInfo.email || "",
        phone: userInfo.phone || "",
    });
  };


  const navigate = useNavigate();

  return (
    
    <div>
       <ToastContainer />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container spacing={5} padding={3}>
          {/* Profile Section */}
          <Grid item xs={12} sm={4}>
            <Card sx={{ padding: 3, textAlign: "center", boxShadow: 6 }}>
              <Avatar
                sx={{ width: 100, height: 100, margin: "0 auto 20px" }}
                src="/Avatar.jpg"
                alt="User avatar"
              />
              <Typography variant="h6">{formData.userName}</Typography>
              <Button
                variant="contained"
                color="success"
                sx={{ margin: "20px 10px" }}
                onClick={() => navigate("/")}
              >
                Trang chủ
              </Button>
              <Divider sx={{ margin: "20px 0" }} />
              <List>
                <ListItem>
                  <ListItemIcon>
                    <ShoppingCart />
                  </ListItemIcon>
                  <ListItemText primary="Sản phẩm đã mua" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Lock />
                  </ListItemIcon>
                  <ListItemText primary="Đổi mật khẩu" />
                </ListItem>
              </List>
            </Card>
          </Grid>

          {/* Form Section */}
          <Grid item xs={12} sm={8}>
            <Card sx={{ padding: 3, boxShadow: 6 }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Tên người dùng"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                  error={!!errors.email} // Set error state
                  helperText={errors.email} // Display error message
                />
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  margin="normal"
                  error={!!errors.phone} // Set error state
                  helperText={errors.phone} // Display error message
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 2,
                  }}
                >
                  <Button
                    onClick={handleReset}
                    variant="outlined"
                    sx={{ marginRight: 2 }}
                  >
                    Tải lại
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Lưu
                  </Button>
                </Box>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default UserProfile;
