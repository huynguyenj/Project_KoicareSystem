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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css"; // Use the minified version
import { getAllUser } from "../../api/userService";
import { useLocation } from "react-router-dom";


function UserInfo() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSelectUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };
  const location = useLocation();
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedUsers(users.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };
   // Function to fetch users
   const fetchUsers = async () => {
    try {
      const response = await getAllUser();
      if (response.code === 1010) {
        setUsers(response.result); // Set users from API response
      } else {
        toast.error("Failed to load users.");
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Failed to load users.");
    }
  };


  useEffect(()=>{
    fetchUsers();
    },[location])

  const handleDeleteSelected = () => {
    const deletedCount = selectedUsers.length;
    setUsers(users.filter((user) => !selectedUsers.includes(user.id)));
    setSelectedUsers([]);
    toast.success(`Đã xóa ${deletedCount} người dùng thành công`, {
      position: "top-right", // Set to top-right
      autoClose: 800,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#f57c00" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Danh sách những người dùng
          </Typography>
          <Typography variant="subtitle1">Thông tin người dùng</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>
        <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteSelected}
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
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selectedUsers.length > 0 &&
                      selectedUsers.length < users.length
                    }
                    checked={selectedUsers.length === users.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>ID</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
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
                  <TableCell>{user.status?"active"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <ToastContainer limit={1} position="top-right" />
    </Box>
  );
}

export default UserInfo;
