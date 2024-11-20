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
  AccountCircle,
  Favorite,
  ShoppingCart,
  Link,
  Lock,
} from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";
import { getMyInfo } from "../../api/userService";


function UserProfile() {
  const [userInfo, setUserInfo] = useState({});
  const [formData, setFormData] = useState({
    username:"",
    password: "",
    email: "",
    phone: userInfo.phone,
  });

  const location = useLocation();
  useEffect(()=>{
    const res = getMyInfo();
    console.log(res.result)
    console.log(userInfo)
    setUserInfo(res.result)
   
  },[])

  async function getInfo() {
    
    try {
      
      const res = await getMyInfo();
      console.log(res.result)
      setUserInfo(res.result)

    } catch (error) {
      alert("Xảy ra sự cố khi lấy dữ liệu!")
      console.log(error)
    }

    
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleReset = () => {
    setFormData({
      username: "",
      password: "",
      gender: "",
      email: "",
      phone: "",
    });
  };


  const navigate = useNavigate();

  return (
    <div>
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
              <Typography variant="h6">Tên tài khoản đăng ký</Typography>
              <Typography variant="body2">Thay đổi ảnh đại diện</Typography>
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
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary="Chỉnh sửa tài khoản" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Favorite />
                  </ListItemIcon>
                  <ListItemText primary="Cá yêu thích" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ShoppingCart />
                  </ListItemIcon>
                  <ListItemText primary="Sản phẩm đã mua" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Link />
                  </ListItemIcon>
                  <ListItemText primary="Liên kết xã hội" />
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
                  label={formData.username}
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Mật khẩu"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Giới tính"
                  name="gender"
                  value={formData.gender}
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
                />
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  margin="normal"
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
