import { useEffect, useState } from 'react';
import './Orders.css'; 

import { InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,Button, TablePagination } from '@mui/material';
import { getAllOrders } from '../../api/shop';
import { Search } from '@mui/icons-material';
import { SearchIcon } from 'lucide-react';
import FooterEnd from '../../components/Footer/FooterEnd';




const mockOrders = [
  { orderId: 1, quantity: 2, price: 50, userName: "John Doe", address: "123 Elm Street", phone: "123-456-7890", date: "2024-01-01" },
  { orderId: 2, quantity: 1, price: 150, userName: "Jane Smith", address: "456 Oak Avenue", phone: "234-567-8901", date: "2024-01-03" },
  { orderId: 3, quantity: 3, price: 75, userName: "Michael Brown", address: "789 Pine Road", phone: "345-678-9012", date: "2024-01-02" },
  { orderId: 4, quantity: 5, price: 200, userName: "Sarah White", address: "321 Maple Lane", phone: "456-789-0123", date: "2024-01-05" },
  { orderId: 5, quantity: 2, price: 100, userName: "Chris Green", address: "654 Cedar Street", phone: "567-890-1234", date: "2024-01-06" },
  { orderId: 6, quantity: 4, price: 120, userName: "Jessica Blue", address: "987 Willow Drive", phone: "678-901-2345", date: "2024-01-04" },
  { orderId: 7, quantity: 6, price: 90, userName: "David Black", address: "111 Birch Way", phone: "789-012-3456", date: "2024-01-08" },
  { orderId: 8, quantity: 1, price: 130, userName: "Emily Orange", address: "222 Spruce Street", phone: "890-123-4567", date: "2024-01-10" },
  { orderId: 9, quantity: 2, price: 75, userName: "Tom Yellow", address: "333 Beech Avenue", phone: "901-234-5678", date: "2024-01-12" },
  { orderId: 10, quantity: 3, price: 110, userName: "Lucy Pink", address: "444 Ash Road", phone: "012-345-6789", date: "2024-01-15" },
  { orderId: 11, quantity: 2, price: 55, userName: "Charlie Red", address: "555 Chestnut Blvd", phone: "123-456-7891", date: "2024-01-18" },
  { orderId: 12, quantity: 4, price: 70, userName: "Daisy Purple", address: "666 Poplar Place", phone: "234-567-8902", date: "2024-01-20" },
];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery,setSearchQuery] = useState("");
  const [displayOrder,setDisplaOrders] = useState([]);
  const [sort,setSort] = useState("newest")
  const [page,setPage] = useState(0)
  const [rowPerPage,setRowPerPage] = useState(6)

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
    handleSearchOrders(query,sort)
  }
  const handleSearchOrders = (search,sortDate) =>{
    console.log(search)
    const filter = orders.filter((order)=>
      order.userName.toLowerCase().includes(search.toLowerCase())||
      order.address.toLowerCase().includes(search.toLowerCase())
    )
    const sortByDate = filter.sort((a,b)=>{
      return sort == "newest"?
      new Date(b.date) - new Date(a.date):
      new Date(a.date) - new Date(b.date)
    })
    setDisplaOrders(sortByDate)

  }

  const handleOrderChange = ()=>{
    const order = sort == "newest"? "oldest":"newest";
    setSort(order)
    handleSearchOrders(searchQuery,order)
    
  }

  const handelPageChange = (e,newPage) => {
    setPage(newPage)
  }

  const handleChangeRowPerPage = (e) =>{
    setRowPerPage(parseInt(e.target.value, 10));
    setPage(0)
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
      <Button
          variant="contained"
          sx={{ml:3}}
          onClick={handleOrderChange}
          >
          {sort ==="newest"? "Ngày mới nhất":"Ngày cũ"}
      </Button>
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
          {mockOrders.length> 0? mockOrders.slice(page*rowPerPage,page*).map((order)=>(
            <TableRow key={order.orderId}>
            <TableCell align='center'>{order.orderId}</TableCell>
            <TableCell align='center'>{order.quantity}</TableCell>
            <TableCell align='center'>{order.price}</TableCell>
            <TableCell align='center'>{order.userName}</TableCell>
            <TableCell align='center'>{order.address}</TableCell>
            <TableCell align='center'>{order.phone}</TableCell>
            <TableCell align='center'>{new Date(order.date).toLocaleDateString()}</TableCell>
            </TableRow>
          )):(
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Typography variant="h6">Không tìm thấy dữ liệu</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[6,12,18]}
        component="div"
        count={displayOrder.length}
        rowsPerPage={rowPerPage}
        page={page}
        onPageChange={handelPageChange}
        onRowsPerPageChange={handleChangeRowPerPage}
      />
   </TableContainer>
 
   </>
  );
};

export default Orders;
