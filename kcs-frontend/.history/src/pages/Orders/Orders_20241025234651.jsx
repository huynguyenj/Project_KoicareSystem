import React from 'react';
import './Orders.css'; 
import ShopD from "../../components/Drawers/Shop";
import FooterEnd from '../../components/Footer/FooterEnd';
import { Paper, Table, TableContainer, TableHead } from '@mui/material';



const Orders = () => {

  return (
   <>
   <TableContainer component={Paper}
      <Table sx={{minWidth:650}} >
        <TableHead>
        </TableHead>
      </Table>
   />
   </>
  );
};

export default Orders;
