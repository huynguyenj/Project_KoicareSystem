import React, { useEffect, useState } from "react";

import { verifyPayment } from "../../api/payment";
import { Box, Button, Card, Typography } from "@mui/material";
import { useCart } from "../Store/Cart";

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
    console.log(params);
    verifyPayments();
  }, []);

  const verifyPayments = async () => {
    try {
      //   const res = await verifyPayment(params);
      const res = 0;
      if (res.code == 0) {

        const storedOrderDetail = localStorage.getItem("orderDetail");

        const orderDetail = storedOrderDetail
          ? JSON.parse(storedOrderDetail)
          : null;

          setOrderInfo(orderDetail);
          setSuccess("Thanh toán thành công!")
      } else {
          setSuccess("Thanh toán thất bại!")
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                  {orderInfo.userName? orderInfo.userName:""}
          </Typography>
          <Typography>
                  {orderInfo.address? orderInfo.address: ""}
          </Typography>
          <Typography>
                  {orderInfo.phone? orderInfo.phone:""}
          </Typography>
          <Typography variant="h5" >
                  
          </Typography>
          <Button variant="contained" sx={{textAlign:'center'}}>Xác nhận đã thanh toán</Button>
        </Card>
      </Box>
    </>
  );
}

export default PaymentSuccess;
