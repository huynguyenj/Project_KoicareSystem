import React, { useEffect, useState } from "react";
import { getShopInfo } from "../../api/shop";
import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";

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
            <Card
              sx={{ maxWidth: 700, textAlign: "center", margin: "auto", mt:5, he }}
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
                <Button size="small">Cập nhật</Button>
              </CardActions>
            </Card>
          </>
        )}
      </Box>
    </div>
  );
}

export default UpdateShopInfo;
