import React, { useEffect, useState } from "react";
import { getShopInfo, updateShop } from "../../api/shop";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowBack, Edit, Save } from "@mui/icons-material";

function UpdateShopInfo() {
  const [shopInfo, setShopInfo] = useState({});
  const [edit, setEdit] = useState(false);
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState({});

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
  const handleSave = async () =>{
      try {
            if(validate()){
                  setLoading(true)
                  await updateShop(shopInfo.shopId,setShopInfo)
                  getInfo();
                  console.log(shopInfo)  
            }
          
      } catch (error) {
            console.log(error)
      }finally{
            setLoading(false)
      }
  }

  const validate = () =>{
      const newError = {}
      if(!shopInfo.shopName || setShopInfo.shopName.trim() == "" ){
            newError.name = "Tên không được để trống!"
      }
      if(!shopInfo.phone ||  !/^\d{10,11}$/.test(shopInfo.phone)){
            newError.phone = "Hãy nhập đúng định dạng của số điện thoại!"
      }
      if(!shopInfo.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(shopInfo.email)){
            newError.email = "Hãy nhập đúng định dạng email!"
      }

      setError(newError)
      return Object.keys(newError).length == 0
      
  }
  return (
    <div>
      <Box>
        {edit ? (
          <>
            <Card
              sx={{
                maxWidth: 700,
                textAlign: "center",
                margin: "auto",
                mt: 10,
              }}
            >
              <CardContent sx={{paddingLeft:10,paddingRight:10}}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  Thông tin của shop
                </Typography>
                <hr
                  style={{ width: "70%", textAlign: "center", margin: "auto" }}
                ></hr>
                <Grid item xs={8} >
                <FormControl fullWidth>
                  <TextField
                    sx={{ mt: 2, borderRadius: 1  }}
                    label="Tên shop"
                    name="shopName"
                    value={shopInfo.shopName}
                    variant="outlined"
                    onChange={handleChange}
                    error={!!error.name}
                    helperText={error.name}
                  ></TextField>
                </FormControl>
                </Grid>
                <FormControl fullWidth>
                  <TextField
                    sx={{ mt: 2 }}
                    label="Địa chỉ"
                    name="address"
                    value={shopInfo.address}
                    variant="outlined"
                    onChange={handleChange}

                  ></TextField>
                </FormControl>

              <Grid item xs={6}>
              <FormControl fullWidth>
                  <TextField
                    sx={{ mt: 2, mb:1 }}
                    label="Số điện thoại"
                    name="phone"
                    value={shopInfo.phone}
                    variant="outlined"
                    onChange={handleChange}
                    error={!!error.phone}
                    helperText={error.phone}
                  ></TextField>
                </FormControl>
              </Grid>
               
              <Grid item xs = {6}>
              <FormControl fullWidth>
                  <TextField
                    sx={{ mt: 2 ,mb:3 }}
                    label="Email"
                    name="email"
                    value={shopInfo.email}
                    variant="outlined"
                    onChange={handleChange}
                    error={!!error.email}
                    helperText={error.email}
                  ></TextField>
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
              </CardContent>
              <CardActions>
                <IconButton color="primary" onClick={handleBack}>
                  <ArrowBack></ArrowBack>
                </IconButton>
                <IconButton color="primary" onClick={handleSave}>
                  {loading ?  <CircularProgress color="inherit" size={17}></CircularProgress>: <Save></Save>}
                 
                </IconButton>
              </CardActions>
      
            </Card>
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
                {shopInfo ? 
                <>
                </>:<></>}
               
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
