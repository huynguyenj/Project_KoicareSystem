import React, { useEffect, useState } from "react";
import { getShopInfo } from "../../api/shop";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { ArrowBack, Edit, Save } from "@mui/icons-material";

function UpdateShopInfo() {
  const [shopInfo, setShopInfo] = useState({});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    try {
      const res = await getShopInfo();
      setShopInfo(res.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    setEdit(true);
  };

  const handleBack = () => {
    setEdit(false);
  };

  const handleChange = (e) =>{
      const {name, value} = e.target;
      setShopInfo({...shopInfo, [name]:value})
  }
  return (
    <div>
      <Box>
        {edit ? (
          <>
            <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 3,
      }}
    >
      <Card
        sx={{
          maxWidth: 700,
          textAlign: "center",
          margin: "auto",
          padding: 3,
          boxShadow: 4,
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
            Thông tin của Shop
          </Typography>
          <Divider
            sx={{ width: "70%", margin: "auto", mb: 3, backgroundColor: "#000" }}
          />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="Tên Shop"
                  name="shopName"
                  value={shopInfo.shopName}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ backgroundColor: "#fff", borderRadius: 1 }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="Địa chỉ"
                  name="address"
                  value={shopInfo.address}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ backgroundColor: "#fff", borderRadius: 1 }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  label="Số điện thoại"
                  name="phone"
                  value={shopInfo.phone}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ backgroundColor: "#fff", borderRadius: 1 }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  label="Email"
                  name="email"
                  value={shopInfo.email}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ backgroundColor: "#fff", borderRadius: 1 }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="Thông tin liên hệ"
                  name="contactInfo"
                  value={shopInfo.contactInfo}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ backgroundColor: "#fff", borderRadius: 1 }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: "center", mt: 2 }}>
          <Tooltip title="Quay lại">
            <IconButton color="primary" onClick={handleBack}>
              <ArrowBack />
            </IconButton>
          </Tooltip>
          <Tooltip title="Lưu">
            <IconButton color="primary" onClick={handleBack}>
              <Save />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </Box>
          </>
        ) : (
          <>
            <Card
              sx={{
                maxWidth: 700,
                textAlign: "center",
                margin: "auto",
                mt: 10,
              }}
            >
              <CardContent>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  Thông tin của shop
                </Typography>
                <hr
                  style={{ width: "70%", textAlign: "center", margin: "auto" }}
                ></hr>
                <Typography sx={{ mt: 2 }}>
                  Tên shop: {shopInfo.shopName}
                </Typography>
                <Typography>Địa chỉ: {shopInfo.address}</Typography>
                <Typography>Số điện thoại: {shopInfo.phone}</Typography>
                <Typography>Email: {shopInfo.email}</Typography>
                <Typography>
                  Thông tin liên lạc: {shopInfo.contactInfo}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton color="primary" onClick={handleClick}>
                  <Edit></Edit>
                </IconButton>
              </CardActions>
            </Card>
          </>
        )}
      </Box>
    </div>
  );
}

export default UpdateShopInfo;
