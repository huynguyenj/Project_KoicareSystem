import React, { useEffect, useState } from "react";
import { getShopInfo } from "../../api/shop";
import { Box, Card, CardContent, TextField, Typography } from "@mui/material";

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
  return (
    <div>
      <Box>
        {edit ? (
          <>
            <TextField></TextField>
          </>
        ) : (
          <>
            <Card sx={{ minWidth: 275, mt:5, textAlign:'center' }}>
                  <CardContent> 
                        <Typography variant="h4">Thông tin của shop</Typography>
                        <Typography>Tên shop: {shopInfo.shopName}</Typography>
                        <Typography>Địa chỉ: {shopInfo.address}</Typography>
                        <Typography>Số điện thoại: {shopInfo.phone}</Typography>
                        <Typography>Email: {shopInfo.email}</Typography>
                        <Typography>Thông tin liên lạc: {shopInfo.contactInfo}</Typography>
                       
                  </CardContent>
             
            </Card>
          </>
        )}
      </Box>
    </div>
  );
}

export default UpdateShopInfo;
