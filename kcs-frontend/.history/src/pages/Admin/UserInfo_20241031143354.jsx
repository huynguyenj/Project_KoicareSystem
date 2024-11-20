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
import { deleteUser, getAllUser, setRoleUser, setStatusUser } from "../../api/userService";
import { useLocation } from "react-router-dom";

function UserInfo() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [roleToSet, setRoleToSet] = useState(""); // State for the role to set
  const [sortUser,setSortUser] = useState([]);
  const [query,setQuery] = useState("");

  const handleSelectUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };
  const location = useLocation();
  // const handleSelectAll = (event) => {
  //   if (event.target.checked) {
  //     setSelectedUsers(users.map((user) => user.id));
  //   } else {
  //     setSelectedUsers([]);
  //   }
  // };
  // Function to fetch users
  const fetchUsers = async () => {
    try {
      const response = await getAllUser();
      if (response.code === 1010) {
        setUsers(response.result); // Set users from API response
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
      toast.error(`Cập nhậtt trạng thái thất bại. Lỗi phía server ${error.message}`);
      console.log(error);
    }
  };

  const handleSort = (e)=>{
    const query = e.target.value;
    setQuery(query)
  }

  const list

  const handleSetRole = async () => {
   
    if(!roleToSet){
      toast.error("Hãy chọn vai trò để cập nhật");
      return;
    }
    try {
     
      await Promise.all(selectedUsers.map((userId) => setRoleUser(userId,roleToSet)));
      
      setSelectedUsers([]);
      await fetchUsers();
      
      const userIdsString = selectedUsers.join(", ");

      toast.success(`Role set to ${roleToSet} for user ID: ${userIdsString}`, {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    } catch (error) {
      toast.error(`Cập nhật vai trò thất bại. Lỗi phía ${error.message}`);
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1
      }}
    >
      <ToastContainer/>
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
            value={roleToSet}
            onChange={(e) => setRoleToSet(e.target.value)}
            style={{width:"10%",marginLeft:'1rem'}}
          >
            <option value="">Select Role</option>
            <option value="shop">Shop</option>
            <option value="unshop">Unshop</option>
          </select>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSetRole}
            disabled={selectedUsers.length === 0}
          >
            Set Role
          </Button>
        
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
                      {user.status ? "Unactivate" : "Activate"}
                    </Button>
                  </TableCell>
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
