import { useEffect, useState } from 'react';
import './Orders.css'; 

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { getAllOrders } from '../../api/shop';




const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [query,searchQuery]
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
   <TableContainer component={Paper} sx={{mt:5}}>
   <Table sx={{minWidth:650}} arial-lable="simple table">
        <TableHead sx={{backgroundColor:'orange','& .MuiTableCell-root':{color:'white',fontWeight:'bold', fontSize:'17px'}}}>
          <TableRow>
            <TableCell align='center'>Order Id</TableCell>
            <TableCell align='center'>Số lượng</TableCell>
            <TableCell align='center'>Giá</TableCell>
            <TableCell align='center'>Tên người mua</TableCell>
            <TableCell align='center'>Địa chỉ</TableCell>
            <TableCell align='center'>Số điện thoại</TableCell>
            <TableCell align='center'>Ngày đặt hàng</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.length> 0? orders.map((order)=>(
            <TableRow key={order.orderId}>
            <TableCell align='center'>{order.orderId}</TableCell>
            <TableCell align='center'>{order.quantity}</TableCell>
            <TableCell align='center'>{order.price}</TableCell>
            <TableCell align='center'>{order.userName}</TableCell>
            <TableCell align='center'>{order.address}</TableCell>
            <TableCell align='center'>{order.phone}</TableCell>
            <TableCell align='center'>{new Date(order.date).toLocaleDateString()}</TableCell>
            </TableRow>
          )):""}
        </TableBody>
      </Table>
   </TableContainer>
   </>
  );
};

export default Orders;
