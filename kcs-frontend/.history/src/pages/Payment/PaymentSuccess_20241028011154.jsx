import React, { useEffect, useState } from "react";

import { verifyPayment } from "../../api/payment";
import { Box, Card, Typography } from "@mui/material";

function PaymentSuccess() {
  const [params, setParams] = useState({});

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
  }, []);

  const verifyPayments = async () => {
    try {
      //   const res = await verifyPayment(params);
      const res = 0;
      if (res.code == 0) {
        const formData = localStorage.getItem("orderDetail");
        console.log(formData);
      } else {
        console.log(res.result);
        // Retrieve the 'orderDetail' from localStorage
        const storedOrderDetail = localStorage.getItem("orderDetail");

        // Parse the JSON string back into an object (if it was stored as JSON)
        const orderDetail = storedOrderDetail
          ? JSON.parse(storedOrderDetail)
          : null;

        console.log(orderDetail);
      }
    } catch (error) {
      console.log(error);
    }
  };
  verifyPayments();
  return (
    <>
      <Box maxWidth={300} sx={{margin:'auto'}}>
        <Card>
            <Typography variant="h5" align="center" bgcolor={"Highlight"} sx={{color:'w'}}>Thông tin thanh toán</Typography>

        </Card>
      </Box>
    </>
  );
}

export default PaymentSuccess;
