import React from 'react';
import './Orders.css'; 
import ShopD from "../../components/Drawers/Shop";
import FooterEnd from '../../components/Footer/FooterEnd';
import { Paper, Table, TableContainer } from '@mui/material';



const Orders = () => {

  return (
   <>
   <TableContainer component={Paper}
      <Table></Table>
   />
   </>
  );
};

export default Orders;
