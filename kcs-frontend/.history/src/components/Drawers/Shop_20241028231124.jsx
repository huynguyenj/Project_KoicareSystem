import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Dashboard from "@mui/icons-material/Dashboard";
import Logout from "@mui/icons-material/Logout";
import MoreIcon from "@mui/icons-material/MoreVert";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon"; // Import for icons
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useNavigate, Outlet } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import { getMyInfo, logout } from "../../api/userService";
import { getShopInfo } from "../../api/shop";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [userInfo,setUserInfo] = useState({})
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const navigator = useNavigate();
 

  useEffect(()=>{
   getInfo();
  },[])

  const getInfo = async() =>{
    try {
      const userInfo = await getShopInfo();
      setUserInfo(userInfo.result)
    } catch (error) {
      console.log(error)
    }
   
  }
  const handleLogout = async() => {
    await logout();
    navigator('/login'); // Redirect to login page after logging out
    
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const drawerItems = [
    {
      text: "Sản phẩm",
      iconType: "img",
      iconSrc: "https://img.icons8.com/ios/50/product--v1.png",
      path:"/shop/addProducts"
    },
    {
      text: "Đơn hàng",
      iconType: "img",
      iconSrc: "https://img.icons8.com/ios/50/shopping-cart--v1.png",
      path:"/shop/orders"
    },
    {
      text: "Doanh thu",
      iconType: "img",
      iconSrc: "https://img.icons8.com/ios/50/get-revenue.png",
      path:"/shop/Revenue"
    },
    {
      text: "Danh sách sản phẩm",
      iconType: "img",
      iconSrc: "https://img.icons8.com/?size=100&id=12428&format=png&color=000000",
      path:"/shop/showProduct"
    },
    {
      text: "Đăng xuất",
      iconType: "img",
      iconSrc: "https://img.icons8.com/ios/50/exit--v1.png",
      action:handleLogout
    },
  ];

  // Drawer functions
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={()=>navigator("/shop/shopAdd/")}>Tạo shop</MenuItem>
      <MenuItem onClick={()}>Thông tin shop của tôi</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  // Drawer content
  <List sx={{ color: 'primary' }}>
 
</List>
  const drawerContent = (
    <Box
      sx={{
        width: 250,
        minHeight: "100vh",
        py: 1,
        color: "black",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List sx={{ color: "primary" }}>
        {drawerItems.map(({ text, iconType, iconSrc, path, action }) => (
          
          <ListItem button key={text}>
             <ListItemButton onClick={() => action ? action() : navigator(path)}>
            <ListItemIcon>
              {iconType === "img" && (
                <img
                  src={iconSrc}
                  alt={text}
                  
                  height="25"
                  style={{
                    filter:
                      "invert(43%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(88%) contrast(87%)",
                  }}
                />
              )}
            </ListItemIcon>
            <ListItemText
              primary={text}
              primaryTypographyProps={{ fontSize: "1.2rem" }}
            />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#212121" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Shop System
          </Typography>
         
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" },ml:1,mt:1 }}
          >
            {userInfo.shopName}
          </Typography>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
           
             
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      {/* Drawer component */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
      <Outlet />
    </Box>
  );
}
