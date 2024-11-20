import { useEffect, useState } from 'react';
import './Orders.css'; 

import { InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { getAllOrders } from '../../api/shop';
import { Search } from '@mui/icons-material';
import { SearchIcon } from 'lucide-react';





const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery,setSearchQuery] = useState("");
  const [displayOrder,setDisplaOrders] = useState([]);

  useEffect(()=>{
    getOrders();
  },[])

  const getOrders = async () =>{
      try {
        const res = await getAllOrders();
        setOrders(res.result)
        setDisplaOrders(res.result)
      } catch (error) {
        console.log(error)
      }
  }
  const handleChangeQuery = (e)=>{
    const query = e.target.value;
  
    setSearchQuery(query)
    handleSearchOrders(query)
  }
  const handleSearchOrders = (search) =>{
    console.log(search)
    const filter = orders.filter((order)=>
      order.userName.toLowerCase().includes(search.toLowerCase())||
      order.address.toLowerCase().includes(search.toLowerCase())
    )
    setDisplaOrders(filter)

  }
  return (
   <>
   <TableContainer component={Paper} sx={{mt:5}}>
    <SearchIcon sx={{ color: 'gray', mr: 1 }}>
    </SearchIcon>
    <InputBase placeholder='search'
       inputProps={{ "aria-label": "search" }
      }
      sx={{mb:2}}
      value={searchQuery}
      onChange={handleChangeQuery}
      
      >
      </InputBase>
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
          {displayOrder.length> 0? displayOrder.map((order)=>(
            <TableRow key={order.orderId}>
            <TableCell align='center'>{order.orderId}</TableCell>
            <TableCell align='center'>{order.quantity}</TableCell>
            <TableCell align='center'>{order.price}</TableCell>
            <TableCell align='center'>{order.userName}</TableCell>
            <TableCell align='center'>{order.address}</TableCell>
            <TableCell align='center'>{order.phone}</TableCell>
            <TableCell align='center'>{new Date(order.date).toLocaleDateString()}</TableCell>
            </TableRow>
          )):: (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Typography variant="h6">Không tìm thấy dữ liệu</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
   </TableContainer>
   </>
  );
};

export default Orders;
