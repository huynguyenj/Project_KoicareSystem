import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Card,
  CircularProgress,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getShopInfo } from "../../api/shop";

function ShopAdd() {
  const [update, setUpdate] = useState(false);
  const [errors, setErrors] = useState({});
  const [shopInfo,setShopInfo] = useState({})
  const [formData, setFormData] = useState({
    shopName: "",
    address: "",
    phone: "",
    email: "",
    contactInfo: "",
    status: true,
  });

  useEffect(()=>{
    getInfo();
  },[])
  const getInfo = async () =>{
    try {
      const res = await getShopInfo()
      setShopInfo(res.result)
    } catch (error) {
      console.log(error)
    }
  }
  const validateFields = () => {
    const newErrors = {};
    if (!formData.shopName || formData.shopName.trim() === "") {
      newErrors.shopName = "Tên cửa hàng không được để trống";
    }
    if (!formData.address || formData.address.trim() === "") {
      newErrors.addr = "Địa chỉ không được để trống";
    }
    if (!formData.phone || !/^\d{10,11}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }
    if (!formData.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      setUpdate(true);
      try {
        console.log(formData)
        // await addShop(formData); // Adjust with your addShop API function
        toast.success("Cửa hàng đã được thêm thành công!");
      } catch (error) {
        console.log(error);
        toast.error("Có lỗi xảy ra khi thêm cửa hàng.");
      } finally {
        setUpdate(false);
      }
    }
  };

  const style = {
    head: {
      textAlign: "center",
      fontSize: "40px",
      fontFamily: "Arial",
      padding: "0",
      margin: "0",
    },
    hr: {
      width: "50%",
      textAlign: "center",
      margin: "0px auto",
      borderTop: "2px solid #000000",
    },
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <Typography style={style.head} variant="h6">
        Thêm cửa hàng của tôi
      </Typography>
      <hr style={style.hr} />
      {shopInfo? : <>}
     
    </>
  );
}

export default ShopAdd;
