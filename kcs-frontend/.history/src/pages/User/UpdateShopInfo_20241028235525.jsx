import React, { useEffect, useState } from "react";
import { getShopInfo } from "../../api/shop";
import { Box, Button, Card, CardActions, CardContent, FormControl, IconButton, TextField, Typography } from "@mui/material";
import { ArrowBack, Edit } from "@mui/icons-material";

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

  const handleClick = () =>{
      setEdit(true);
  }

  const handleBack = () =>{
      setEdit(false);
  }
  return (
    <div>
      <Box>
        {edit ? (
          <>
             <Card
              sx={{ maxWidth: 700, textAlign: "center", margin: "auto", mt:10 }}
            >
              <CardContent>
                 
                <Typography variant="h4" sx={{mb:2}} >Thông tin của shop</Typography>
                <hr style={{width:'70%', textAlign:'center', margin:'auto'}}></hr>
                <FormControl>
                <TextField sx={{mt:2}} label="Tên shop" value={shopInfo.shopName}>
                        
                        </TextField>
                </FormControl>
              
                <TextField sx={{mt:2}} label="Tên shop" value={shopInfo.address}>
                        
                        </TextField>
                <Typography>Địa chỉ: {shopInfo.address}</Typography>
                <Typography>Số điện thoại: {shopInfo.phone}</Typography>
                <Typography>Email: {shopInfo.email}</Typography>
                <Typography>
                  Thông tin liên lạc: {shopInfo.contactInfo}
                </Typography>
              </CardContent>
              <CardActions>
               <IconButton
                  color="primary"
                  onClick={handleBack}
               >

                  <ArrowBack></ArrowBack>
               </IconButton>
              </CardActions>
            </Card>
          </>
        ) : (
          <>
            <Card
              sx={{ maxWidth: 700, textAlign: "center", margin: "auto", mt:10 }}
            >
              <CardContent>
                <Typography variant="h4" sx={{mb:2}} >Thông tin của shop</Typography>
                <hr style={{width:'70%', textAlign:'center', margin:'auto'}}></hr>
                <Typography sx={{mt:2}}>Tên shop: {shopInfo.shopName}</Typography>
                <Typography>Địa chỉ: {shopInfo.address}</Typography>
                <Typography>Số điện thoại: {shopInfo.phone}</Typography>
                <Typography>Email: {shopInfo.email}</Typography>
                <Typography>
                  Thông tin liên lạc: {shopInfo.contactInfo}
                </Typography>
              </CardContent>
              <CardActions>
               <IconButton
                  color="primary"
                  onClick={handleClick}
               >

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
