import React, { useEffect, useState } from 'react';
import './Orders.css'; 
import ShopD from "../../components/Drawers/Shop";
import FooterEnd from '../../components/Footer/FooterEnd';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { getAllOrders } from '../../api/shop';
import { Tab } from 'bootstrap';



const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(()=>{
    getOrders();
  },[])
  const getOrders = async () =>{
      try {
        const res = await getAllOrders();
        setOrders(res.result)
      } catch (error) {
        console.log(error)
      }
  }
  return (
   <>
   <TableContainer component={Paper}>
   <Table sx={{minWidth:650}} arial-lable="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order Id</TableCell>
            <TableCell>Số lượng</TableCell>
            <TableCell>Giá</TableCell>
            <TableCell>Tên người mua</TableCell>
            <TableCell>Địa chỉ</TableCell>
            <TableCell>Số điện thoại</TableCell>
            <TableCell>Ngày đặt hàng</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.length> 0? orders.map((order)=>(
            <TableRow key={order.orderId}>
            <TableCell>{order.orderId}</TableCell>
            <TableCell>{order.quantity}</TableCell>
            <TableCell>{order.price}</TableCell>
            <TableCell>{order.}</TableCell>
            <TableCell>Địa chỉ</TableCell>
            <TableCell>Số điện thoại</TableCell>
            <TableCell>Ngày đặt hàng</TableCell>
            </TableRow>
          )):""}
        </TableBody>
      </Table>
   </TableContainer>
   </>
  );
};

export default Orders;
