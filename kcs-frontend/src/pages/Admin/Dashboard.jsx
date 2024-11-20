import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Container,
  Grid,
  Paper,
  Box,
} from "@mui/material";
import { BarChart, People, TrendingUp } from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getAllUser, trackingUser } from "../../api/userService";
import { toast, ToastContainer } from "react-toastify";



const Dashboard = () => {
  
  const [sumUser, setSumUsers] = useState(0);
  const [trackingUsers, setTrackingUsers] = useState(0);

  useEffect(() => {
    countUsers();
    trackingUserLogin();
  }, []);
  

  async function countUsers() {

    try {
      const res = await getAllUser();
      setSumUsers(res.result.length);
      
  
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } 
  }

  
  async function trackingUserLogin() {

    try {
      const res = await trackingUser();
      if(res.code == 1010){
       
        setTrackingUsers(res.result.userCount)
       
      }else{
        toast.error("Cập nhật thất bại")
      }
  
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } 
  }
   return (
     <Box
       sx={{
         flexGrow: 1,
         background: "linear-gradient(to right, #2c3e50, #4ca1af)",
         minHeight: "100vh",
         py: 5,
       }}
     >
       <Container maxWidth="lg">
         <Typography
           variant="h4"
           gutterBottom
           sx={{fontWeight: "bold", textAlign: "center", color: "#fff", fontSize: "50px", mb: 4 }}
         >
           Dashboard
         </Typography>
         <Grid container spacing={3} justifyContent="center" textAlign="center">
           <Grid item xs={12} sm={6} md={4}>
             <StatCard
               title="Số tài khoản đăng ký"
               value={sumUser}
               icon={People}
             />
           </Grid>
           <Grid item xs={12} sm={6} md={4}>
             <StatCard
               title="Lượt truy cập trang web"
               value={trackingUsers}
               icon={BarChart}
             />
           </Grid>
           <Grid item xs={12}>
            
           </Grid>
         </Grid>
       </Container>
     </Box>
   );
};

const StatCard = ({ title, value, icon: Icon }) => (
  <Paper
    sx={{
      p: 3,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "left",
      borderRadius: 4,
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.12)",
      backgroundColor: "#424242",
      color: "#fff",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
      <Icon sx={{ mr: 2, color: "#4ca1af", fontSize: 36 }} />
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
    </Box>
    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
      {value}
    </Typography>
  </Paper>
);

export default Dashboard;
