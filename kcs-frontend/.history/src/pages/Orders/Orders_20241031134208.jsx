import { useEffect, useState } from "react";
import "./Orders.css";

import {
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  TablePagination,
  Tooltip,
  Checkbox,
} from "@mui/material";
import { getAllOrders } from "../../api/shop";
import { Search } from "@mui/icons-material";
import { SearchIcon } from "lucide-react";
import FooterEnd from "../../components/Footer/FooterEnd";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayOrder, setDisplaOrders] = useState([]);
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(6);
  const [selectOrder,setSelectOrder] = useState([])
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const res = await getAllOrders();
      setOrders(res.result);
      setDisplaOrders(res.result);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeQuery = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearchOrders(query, sort);
  };
  const handleSearchOrders = (search, sortDate) => {
    console.log(search);
    const filter = orders.filter(
      (order) =>
        order.userName.toLowerCase().includes(search.toLowerCase()) ||
        order.address.toLowerCase().includes(search.toLowerCase())
    );
    const sortByDate = filter.sort((a, b) => {
      return sortDate == "newest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date);
    });
    setDisplaOrders(sortByDate);
  };

  const handleOrderChange = () => {
    const order = sort == "newest" ? "oldest" : "newest";
    setSort(order);
    handleSearchOrders(searchQuery, order);
  };

  const handelPageChange = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowPerPage = (e) => {
    setRowPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleSelectOrder = (orderId)=>{
    setSelectOrder((prev)=>
      prev.includes(orderId)? prev.filter((orderId)=>)
    )
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 5 }}>
        <SearchIcon sx={{ color: "gray", mr: 1 }}></SearchIcon>
        <InputBase
          placeholder="search"
          inputProps={{ "aria-label": "search" }}
          sx={{ mb: 2 }}
          value={searchQuery}
          onChange={handleChangeQuery}
        ></InputBase>
        <Button variant="contained" sx={{ ml: 3 }} onClick={handleOrderChange}>
          {sort === "newest" ? "Ngày mới nhất" : "Ngày cũ"}
        </Button>
        <Table sx={{ minWidth: 650 }} arial-lable="simple table">
          <TableHead
            sx={{
              backgroundColor: "orange",
              "& .MuiTableCell-root": {
                color: "white",
                fontWeight: "bold",
                fontSize: "17px",
              },
            }}
          >
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="center">Số lượng</TableCell>
              <TableCell align="center">Giá</TableCell>
              <TableCell align="center">Tên sản phẩm</TableCell>
              <TableCell align="center">Tên người mua</TableCell>
              <TableCell align="center">Địa chỉ</TableCell>
              <TableCell align="center">Số điện thoại</TableCell>
              <TableCell align="center">Ngày đặt hàng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayOrder.length > 0 ? (
              displayOrder
                .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                .map((order) => (
                  <TableRow key={order.orderId}>
                    <TableCell padding="checkbox">
                        <Checkbox
                          checked = {selectOrder.includes(order.orderId)}
                          onChange={()=>handleSelectOrder(order.orderId)}
                        />
                        
                    </TableCell>
                    <TableCell align="center">{order.quantity}</TableCell>
                    <TableCell align="center">{order.price}</TableCell>
                    <TableCell align="center">
                      {
                        <>
                          <Tooltip title={order.productName} arrow>
                            <Typography
                              maxWidth={150}
                              whiteSpace={"nowrap"}
                              overflow={"hidden"}
                              textOverflow={"ellipsis"}
                            >
                              {order.productName}
                            </Typography>
                          </Tooltip>
                        </>
                      }
                    </TableCell>
                    <TableCell align="center">{order.userName}</TableCell>
                    <TableCell align="center">{order.address}</TableCell>
                    <TableCell align="center">{order.phone}</TableCell>
                    <TableCell align="center">
                      {new Date(order.date).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="h6">Không tìm thấy dữ liệu</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[6, 12, 18]}
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
