import React, { useEffect, useState } from 'react';
import './Orders.css'; 
import ShopD from "../../components/Drawers/Shop";
import FooterEnd from '../../components/Footer/FooterEnd';
import { Paper, Table, TableContainer, TableHead } from '@mui/material';
import { getAllOrders } from '../../api/shop';



const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(())
  const getOrders = async () =>{
      try {
        await getAllOrders();
      } catch (error) {
        console.log(error)
      }
  }
  return (
   <>
   <TableContainer component={Paper}>
   <Table sx={{minWidth:650}} arial-lable="simple table">
        <TableHead>
        </TableHead>
      </Table>
   </TableContainer>
   </>
  );
};

export default Orders;
