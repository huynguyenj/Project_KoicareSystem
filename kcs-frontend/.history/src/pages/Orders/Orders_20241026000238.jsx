import React, { useEffect, useState } from 'react';
import './Orders.css'; 
import ShopD from "../../components/Drawers/Shop";
import FooterEnd from '../../components/Footer/FooterEnd';
import { Paper, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
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
            <TableCell>Ord0er Id</TableCell>

          </TableRow>
        </TableHead>
      </Table>
   </TableContainer>
   </>
  );
};

export default Orders;
