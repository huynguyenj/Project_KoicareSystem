import React, { useEffect, useState } from "react";

import { verifyPayment } from "../../api/payment";
import { Box, Button, Card, Typography } from "@mui/material";
import { useCart } from "../Store/Cart";
import { order } from "../../api/product";

function PaymentSuccess() {
  const [params, setParams] = useState({});
  const [orderInfo, setOrderInfo] = useState({});
  const [success, setSuccess] = useState('')
  useEffect(() => {
    const param = new URLSearchParams(window.location.search);
    const objectParam = {};
    // Populate the params object with the key-value pairs from the URL
    param.forEach((value, key) => {
      objectParam[key] = value;
    });
    setParams(objectParam);
    // Log or inspect params to verify it contains all query parameters
   ;
   const encodedOrder = param.get("order");
   if (encodedOrder) {
    const orderDetail = JSON.parse(decodeURIComponent(encodedOrder));
    setOrderInfo(orderDetail); // Set order information in state
  }
    verifyPayments();

  },[]);

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      verifyPayments();
    }
  }, [params]);

  const verifyPayments = async () => {
    try {
        const res = await verifyPayment(params);
      if (res.code === 0) {

          console.log(orderInfo)
          setSuccess("Thanh toán thành công!")
      } else {
         
          setSuccess("Thanh toán thất bại!")
          localStorage.removeItem("orderDetail")
      }
    } catch (error) {
      console.log(error);
    }
  };
   const handleConfirm = async()=>{
      // if(orderInfo){
      //   try {
      //     // await order(orderInfo);
      //     console.log(orderInfo)
      //   } catch (error) {
      //     console.log(error)
      //   }
      // }
      console.log(orderInfo)
   }

  return (
    <>
      <Box maxWidth={400} sx={{ margin: "auto",textAlign:'center' }}>
        <Card>
          <Typography
            variant="h5"
            align="center"
            bgcolor={"Highlight"}
            sx={{ color: "white" }}
          >
            Thông tin thanh toán
          </Typography>
          <Typography>
            {orderInfo && orderInfo.userName ? `Tên người mua: ${orderInfo.userName}` : ""}
          </Typography>
          <Typography>
            {orderInfo && orderInfo.address ? `Địa chỉ: ${orderInfo.address}` : ""}
          </Typography>
          <Typography>
            {orderInfo && orderInfo.phone ? `Số điện thoại: ${orderInfo.phone}` : ""}
          </Typography>
          <Typography variant="h5" color="success">
                  {success}
          </Typography>
          <Button variant="contained" sx={{textAlign:'center'}} onClick={handleConfirm}>Xác nhận</Button>
        </Card>
      </Box>
    </>
  );
}

export default PaymentSuccess;
