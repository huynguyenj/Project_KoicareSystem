import React, { useEffect, useState } from "react";

import { verifyPayment } from "../../api/payment";
import { Box, Button, Card, Typography } from "@mui/material";
import { useCart } from "../Store/Cart";
import { order } from "../../api/product";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const [params, setParams] = useState({});
  const [orderInfo, setOrderInfo] = useState({});
  const [success, setSuccess] = useState("");
  const navigator = useNavigate();
  const [orderData, setOrderData] = useState({
  });
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

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      verifyPayments();
    }
  }, [params]);

  const verifyPayments = async () => {
    try {
      const res = await verifyPayment(params);
      const storedOrderDetail = localStorage.getItem("orderDetail");
      const orderDetail = storedOrderDetail ? JSON.parse(storedOrderDetail): null;
      const orId = localStorage.getItem("orderId");
      const orderIdInfo = orId ? JSON.parse(orId):null
      if (res.code === 0) {

        setOrderInfo(orderDetail);
        console.log(orderInfo);
        setSuccess("Thanh toán thành công!");
        localStorage.removeItem("orderDetail")
      } else {
        setSuccess("Thanh toán thất bại!");
        setOrderData(orderIdInfo);
        console.log(orderIdInfo.[0].orderId)
        // localStorage.removeItem("orderDetail");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirm = async () => {
    try {
      await order(orderInfo);
      localStorage.removeItem("orderDetail");
      navigator("/userhome/store");
    } catch (error) {
      console.log(error);
      navigator("/userhome/store");
    }
  };

  return (
    <>
      <Box maxWidth={400} sx={{ margin: "auto", textAlign: "center" }}>
        <Card elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
          <Typography
            variant="h5"
            align="center"
            bgcolor={"Highlight"}
            sx={{ color: "white", padding: 2, borderRadius: 2 }}
          >
            Thông tin thanh toán
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {orderInfo && orderInfo.userName ? (
              <strong>Tên người mua:</strong>
            ) : (
              ""
            )}
                {orderInfo && orderInfo.userName ? ` ${orderInfo.userName}` : ""}
          </Typography>
          <Typography>
            {orderInfo && orderInfo.address
              ? `Địa chỉ: ${orderInfo.address}`
              : ""}
          </Typography>
          <Typography>
            {orderInfo && orderInfo.phone
              ? `Số điện thoại: ${orderInfo.phone}`
              : ""}
          </Typography>
          <Typography variant="h5" color="success">
            {success}
          </Typography>
          <Button
            variant="contained"
            sx={{ textAlign: "center",backgroundColor:'success.main','&:hover':{opacity:0.8} }}
            onClick={handleConfirm}
          >
            Xác nhận
          </Button>
        </Card>
      </Box>
    </>
  );
}

export default PaymentSuccess;
