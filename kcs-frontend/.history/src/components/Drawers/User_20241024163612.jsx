import * as React from "react";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import AccountCircle from "@mui/icons-material/AccountCircle"; // Added AccountCircle import
import { Button, CardMedia, InputBase } from "@mui/material";
import { useNavigate, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faClock,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../pages/Store/Cart"; // Adjust the import path
const drawerWidth = 240;

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

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const { cartItems, updateQuantity, removeFromCart } = useCart(); // Use the Cart context
  const [open, setOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleCartDrawer = (open) => () => {
    setCartOpen(open);
  };

  const handleQuantityChange = (product, amount) => {
    if (amount < 0) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  const handleDeleteItem = (product) => {
    removeFromCart(product.id);
  };

  // Handle profile menu open (define your own logic for opening profile menu)
  const handleProfileMenuOpen = (event) => {
    // Implement the logic for opening the profile menu (e.g., a dropdown or a popover)
    console.log("Profile menu opened");
  };

  const drawerItems = [
    {
      text: "Thông tin cá nhân",
      iconType: "img",
      iconSrc: "https://img.icons8.com/ios-glyphs/48/about-us-male.png",
      path: "/userhome/userprofile",
    },
    {
      text: "Cá của tôi",
      iconType: "img",
      iconSrc: "https://img.icons8.com/ios-filled/50/koi-fish.png",
      path: "/userhome/myfish",
    },
    {
      text: "Hồ của tôi",
      iconType: "img",
      iconSrc: "https://img.icons8.com/glyph-neue/50/lake.png",
      path: "/userhome/mypond",
    },
    {
      text: "Thông số đo",
      iconType: "img",
      iconSrc: "https://img.icons8.com/ios-filled/50/measure.png",
      path: "/measurement",
    },
    {
      text: "Tính toán",
      iconType: "img",
      iconSrc: "https://img.icons8.com/ios-filled/50/calculate.png",
      path: "/calculations",
    },
    {
    
      text: "Blog",
      iconType: "img",
      iconSrc: "https://img.icons8.com/?size=100&id=58240&format=png&color=000000",
      path: "/news",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#212121" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[{ mr: 2 }, open && { display: "none" }]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Welcome
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label={`show ${cartItems.length} items in cart`}
              color="inherit"
              onClick={toggleCartDrawer(true)}
            >
              <Badge badgeContent={cartItems.length} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {drawerItems.map(({ text, iconType, iconSrc, path }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => navigate(path)}>
                <ListItemIcon>
                  {iconType === "img" ? (
                    <img
                      src={iconSrc}
                      alt={text}
                      width="30"
                      height="30"
                      style={{
                        filter:
                          "invert(43%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(88%) contrast(87%)",
                      }}
                    />
                  ) : null}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[
            { text: "Cửa hàng", icon: faCartShopping, path: "/userhome/store" },
            { text: "Hẹn giờ", icon: faClock },
            { text: "Đánh giá", icon: faStar },
          ].map(({ text, icon, path }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => navigate(path)}>
                <ListItemIcon>
                  <FontAwesomeIcon style={{ fontSize: "24px" }} icon={icon} />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Button
          variant="text"
          sx={{ m: 2 }}
          color="primary"
          onClick={() => navigate("/")}
        >
          Back to Homepage
        </Button>
      </Drawer>

      {/* Cart Drawer */}
      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={toggleCartDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "400px",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Giỏ hàng của bạn</Typography>
          <Divider sx={{ my: 2 }} />
          {cartItems.length > 0 ? (
            <List>
              {cartItems.map((item) => (
                <ListItem key={item.product.id}>
                  {/* Display the product image */}
                  <CardMedia
                    component="img"
                    sx={{ width: 80, height: 80, objectFit: "cover", mr: 2 }}
                    image={item.product.image}
                    alt={item.product.name}
                  />
                  <ListItemText
                    primary={item.product.name}
                    secondary={`Giá: ${item.product.price}`}
                  />
                  {/* Display Quantity */}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      <RemoveIcon />
                    </IconButton>
                    {/* Display the actual quantity as a number */}
                    <Typography variant="body1">
                      {item.quantity}
                    </Typography>{" "}
                    {/* Quantity Display */}
                    <IconButton
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                  {/* Remove Product Item */}
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteItem(item.product)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>Giỏ hàng của bạn đang trống</Typography>
          )}
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={() => navigate("/checkout")}
            >
              Tiến hành thanh toán
            </Button>
          </Box>
        </Box>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
