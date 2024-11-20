import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Pagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css"; // Use the minified version
import { deleteUser, getAllUser, setRoleUser, setStatusUser } from "../../api/userService";
import { useLocation } from "react-router-dom";

function UserInfo() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const pageLimit = 6;
  const [page,setPage] = useState(1);

  const [sortUser,setSortUser] = useState([]);
  const [query,setQuery] = useState("");

  const handleSelectUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };
 
  const fetchUsers = async () => {
    try {
      const response = await getAllUser();
      if (response.code === 1010) {
        setUsers(response.result); // Set users from API response
        setSortUser(response.result)
        console.log(users)
      } else {
        toast.error("Tải dữ liệu người dùng thất bại.");
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error(`Lấy thông tin người dùng thất bại. Lỗi phía server ${error.message}`);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteSelected = async () => {
    const deletedCount = selectedUsers.length;
    
    const confirmDelete = window.confirm("Bạn có chắc bạn muốn xóa?");
    if (!confirmDelete) return;
    
    try {
      await Promise.all(selectedUsers.map((userId) => deleteUser(userId)));
      setUsers(users.filter((user) => !selectedUsers.includes(user.userId)));
      setSelectedUsers([]);
      fetchUsers();
      toast.success(`Đã xóa ${deletedCount} người dùng thành công`, {
        position: "top-right", // Set to top-right
        autoClose: 800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    } catch (error) {
      toast.error("Xóa thất bại. Lỗi phía server");
      console.error("Error deleting users:", error);
    }
  };

  const handleRefresh = () => {
    setTimeout(() => {
      fetchUsers();
      toast.info("Đã cập nhật dữ liệu người dùng", {
        position: "top-right", // Set to top-right
        autoClose: 800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    }, 100);
  };

  const toggleUserStatus = async (userId) => {
    try {
      const user = users.find((user) => user.userId === userId);
      const newStatus = user.status ? "unactive" : "active";
      await setStatusUser(userId, newStatus);
      fetchUsers();
      toast.success(`Cập nhật trạng thái người dùng thành công`, {
        position: "top-right",
        autoClose: 800,
      });
    } catch (error) {
      toast.error(`Cập nhật trạng thái thất bại. Lỗi phía server ${error.message}`);
      console.log(error);
    }
  };

  const handleSort = (e)=>{
    const query = e.target.value;
    setQuery(query)
    listSort(query)
  }

  const listSort = (query) => {
    const listUser = users.filter((user) => 
      user.roles.some((role) => role.userType.toLowerCase() === query.toLowerCase())
    );
    setSortUser(listUser);
    setPage(1)
  };

  const handleChangePage = (e,value)=>{
    setPage(value)
  }
  const pageSlice = sortUser.slice((page-1)*pageLimit, page*pageLimit);
 

  return (
    <Box
      sx={{
        flexGrow: 1
      }}
    >
    <ToastContainer limit={1} position="top-right" />
      <AppBar position="static" sx={{ backgroundColor: "#f57c00" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Danh sách những người dùng
          </Typography>
          <Typography variant="subtitle1">Thông tin người dùng</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>
        <Box sx={{ mb: 2, display: "flex"}}>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteSelected}
            sx={{mr:1}}
            disabled={selectedUsers.length === 0}
          >
            Xoá thành viên
          </Button>

          <Button
            variant="contained"
            color="primary"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
          >
            Cập nhật
          </Button>
         

          <select
            className="me-2"
            value={query}
            onChange={handleSort}
            style={{width:"10%",marginLeft:'1rem'}}
          >
            <option value="">Search role</option>
            <option value="ADMIN">Admin</option>
            <option value="SHOP">Shop</option>
            <option value="USER">Người dùng</option>
          </select>
        </Box>
       
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>ID</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>User status action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pageSlice.length > 0 ? (pageSlice.map((user) => (
                <TableRow key={user.userId}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.includes(user.userId)}
                      onChange={() => handleSelectUser(user.userId)}
                    />
                  </TableCell>
                  <TableCell>{user.userId}</TableCell>
                  <TableCell>{user.userName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.status ? "Active" : "Unactive"}</TableCell>
                  <TableCell>
                    {user.roles.map((role, index) => (
                      <span key={index}>
                        {role.userType}
                        {index < user.roles.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color={user.status ? "error" : "success"}
                      onClick={() => toggleUserStatus(user.userId)}
                    >
                      {user.status ? "Unactive" : "Activate"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))):(<Typography>Không có dữ liệu</Typography>)}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display='flex' justifyContent='center' mt={2}>
            <Pagination
              count={Math.ceil(sortUser.length/pageLimit)}
              page={page}
              onChange={handleChangePage}
              color="primary"
            >
            </Pagination>
        </Box>
      </Box>
    
    </Box>
  );
}

export default UserInfo;
