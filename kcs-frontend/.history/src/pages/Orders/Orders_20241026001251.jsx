import { useEffect, useState } from 'react';
import './Orders.css'; 

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { getAllOrders } from '../../api/shop';




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
            <TableRow key={order.orderId} sx={{}}>
            <TableCell>{order.orderId}</TableCell>
            <TableCell align='r'>{order.quantity}</TableCell>
            <TableCell align='r'>{order.price}</TableCell>
            <TableCell align='r'>{order.userName}</TableCell>
            <TableCell align='r'>{order.address}</TableCell>
            <TableCell align='r'>{order.phone}</TableCell>
            <TableCell align='r'>{new Date(order.date).toLocaleDateString()}</TableCell>
            </TableRow>
          )):""}
        </TableBody>
      </Table>
   </TableContainer>
   </>
  );
};

export default Orders;
