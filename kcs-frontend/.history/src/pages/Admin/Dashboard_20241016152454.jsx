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

const data = [
  { name: "Jan", users: 4000 },
  { name: "Feb", users: 3000 },
  { name: "Mar", users: 5000 },
  { name: "Apr", users: 4500 },
  { name: "May", users: 6000 },
  { name: "Jun", users: 5500 },
];

const Dashboard = () => {
  
  const [sumUser, setSumUsers] = useState(0);
  const [trackingUsers, setTrackingUsers] = useState();

  useEffect(()=>{
    countUsers();

  },[]);

  async function countUsers() {

    try {
      const res = await getAllUser();
      if(res.code == 1010){
        toast.success("Cập nhật người dùng")
        setSumUsers(res.result.length);
      }else{
        toast.error("Cập nhật thất bại")
      }
  
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } 
  }

  
  async function trackingUserLogin() {

    try {
      const res = await trackingUser();
      if(res.code == 1010){
        toast.success("Cập nhật người dùng")
        setTrackingUsers(res.result)
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
           sx={{ textAlign: "center", color: "#fff", fontSize: "50px", mb: 4 }}
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
               value={trackingUser}
               icon={BarChart}
             />
           </Grid>
           <Grid item xs={12}>
             <Paper
               sx={{
                 p: 3,
                 borderRadius: 4,
                 boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.12)",
                 backgroundColor: "#424242",
                 color: "#fff",
               }}
             >
               <Typography
                 variant="h6"
                 sx={{ mb: 2, display: "flex", alignItems: "center" }}
               >
                 <TrendingUp sx={{ mr: 1, color: "#4ca1af" }} />
                 User Growth Trend
               </Typography>
               <ResponsiveContainer width="100%" height={300}>
                 <LineChart data={data}>
                   <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                   <XAxis dataKey="name" stroke="#fff" />
                   <YAxis stroke="#fff" />
                   <Tooltip
                     contentStyle={{
                       backgroundColor: "#424242",
                       border: "none",
                     }}
                     labelStyle={{ color: "#fff" }}
                   />
                   <Legend />
                   <Line
                     type="monotone"
                     dataKey="users"
                     stroke="#4ca1af"
                     strokeWidth={2}
                   />
                 </LineChart>
               </ResponsiveContainer>
             </Paper>
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
