import React from 'react';
import './Orders.css'; 
import ShopD from "../../components/Drawers/Shop";
import FooterEnd from '../../components/Footer/FooterEnd';
import { Paper, Table, TableContainer, TableHead } from '@mui/material';



const Orders = () => {
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
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
