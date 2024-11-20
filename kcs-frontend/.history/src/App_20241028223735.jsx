import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "./pages/Guest/Home/Home";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/SignUp/SignUp";
import UserProfile from "./pages/UserProfile/UserProfile";

import Layout from "./components/Layout";
import Drawers from "./components/Drawers/User";
// import NavbarUser from "./components/NavbarAfterLogin/NavbarUser";
import MyFish from "./pages/MyFish/FishAdd";
import FishInfo from "./pages/MyFish/FishInfo";
import MyPond from "./pages/MyPond/MyPond";
import Admin from "./components/Drawers/Admin";
import Shop from "./components/Drawers/Shop";
import Dashboard from "./pages/Admin/Dashboard";
import UserInfo from "./pages/Admin/UserInfo";
import HomeForShop from "./pages/HomeForShop/HomeForShop";
// import AddProducts from "./pages/Products/AddProducts/AddProducts";
import FishList from "./pages/MyFish/MyFish";
import PondAdd from "./pages/MyPond/PondAdd";
import PondList from "./pages/MyPond/PondList";
import PondInfo from "./pages/MyPond/PondInfo";
import Store from "./pages/Store/Product";
import Details from "./pages/Store/Details";
import Orders from "./pages/Orders/Orders";
import Status_Products from "./pages/Status_Products/Status_Products";
import AddProducts from "./pages/Products/AddProducts/AddProducts";
import Revenue from "./pages/Revenue/Revenue"

import News from "./pages/News/News";

import AddBlog from "./pages/News/AddBlog";
import BlogInfo from "./pages/News/blogInfo";
import MyBlog from "./pages/News/MyBlog";
import UpdateBlog from "./pages/News/UpdateBlog";
import Payment from "./pages/Payment/Payment";
import AddWaterParam from "./pages/Calculate/WaterParam/AddWaterParam";
import ViewWaterParam from "./pages/Calculate/WaterParam/ViewWaterParam";
import AddDevelopment from "./pages/MyFish/addDevelopment";
import FishDevelopmentData from "./pages/MyFish/FishDevelopmentData";
import CalculationFood from "./pages/Calculate/CalculationFood";
import CalculateSalt from "./pages/Calculate/CalculateSalt";
import PaymentSuccess from "./pages/Payment/PaymentSuccess";
import ChangePass from "./pages/UserProfile/ChangePass";
import ShowProducts from "./pages/Products/ShowProducts/ShowProducts";
import ShopAdd from "./pages/User/ShopAdd";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        {
          path: "userhome",
          element: <Drawers />,
          children: [
            { path: "userprofile", element: <UserProfile /> },
            { path: "myfish", element: <MyFish /> },
            { path: "myfishlist", element: <FishList /> },
            { path: "myfishlist/fishinfo/:id", element: <FishInfo/>},
            { path: "mypond", element: <MyPond /> },
            { path: "pondadd", element: <PondAdd /> },
            { path: "pondlist", element: <PondList /> },
            { path: "pondlist/pondinfo/:id", element: <PondInfo /> },
            { path: "store", element: <Store /> },
            { path: "/userhome/store/:id", element: <Details /> },
            { path: "", element: <Navigate to="mypond" replace /> },
            { path: "news", element: <News /> },
            { path:"param", element: <AddWaterParam/>},
            { path:"viewparam/:id", element:<ViewWaterParam/>},
            { path:"addDevelop/:id", element:<AddDevelopment/>},
            { path:"fishDevelopment/:id", element:<FishDevelopmentData/>},
            { path:"calculateFood", element:<CalculationFood/>},
            {path:"calculateSalt", element:<CalculateSalt/>},
            { path: "payment", element: <Payment />},
            { path: "paymentSuccess", element:<PaymentSuccess/>},
            { path: "changePass", element:<ChangePass/>}

          ],
        },
      ],
    },
    { path: "news", element: <News /> },
    { path: "addBlog", element: <AddBlog /> },
    { path: "blogDetail/:blogId", element: <BlogInfo /> },
    { path: "my-blogs", element: <MyBlog /> },
    { path: "updateBlog/:blogId", element: <UpdateBlog/> },
    

    {
      path: "admin",
      element: <Admin />,
      children: [
        { path: "userInfo", element: <UserInfo /> },
        { path: "", element: <Navigate to="userInfo" replace /> },
        { path: "dashboard", element: <Dashboard /> },
      ],
    },
    {
      path: "shop",
      element: <Shop />,
      children: [
        { path: "homeForShop", element: <HomeForShop /> },
        { path: "addProducts", element: <AddProducts /> },
        { path: "showProduct", element: <ShowProducts /> },
        { path: "orders", element: <Orders /> },
        { path: "revenue", element: <Revenue /> },
        { path: "status_Products", element: <Status_Products /> },
        { path: "", element: <Navigate to="addProducts" replace /> },
        { path : "shopAdd", element: <ShopAdd/>}
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />

    </>
  );
}

export default App;
