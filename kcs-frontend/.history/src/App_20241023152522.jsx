import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "./pages/Guest/Home/Home";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/SignUp/SignUp";
import UserProfile from "./pages/UserProfile/UserProfile";
import User from "./pages/User/User";
import Layout from "./components/Layout";
import Drawers from "./components/Drawers/User";
// import NavbarUser from "./components/NavbarAfterLogin/NavbarUser";
import MyFish from "./pages/MyFish/FishAdd";
import MyPond from "./pages/MyPond/MyPond";
import Admin from "./components/Drawers/Admin";
import Shop from "./components/Drawers/Shop";
import Dashboard from "./pages/Admin/Dashboard";
import UserInfo from "./pages/Admin/UserInfo";
import HomeForShop from "./pages/HomeForShop/HomeForShop";
import ShowProduct from "./pages/Products/ShowProducts/ShowProducts";
// import AddProducts from "./pages/Products/AddProducts/AddProducts";
import FishList from "./pages/MyFish/MyFish";
import PondAdd from "./pages/MyPond/PondAdd";
import PondList from "./pages/MyPond/PondList";
import PondInfo from "./pages/MyPond/PondInfo";
import Store from "./pages/Store/Product";
import Details from "./pages/Store/Details";
<<<<<<< HEAD
=======
import AddProducts from "./pages/Products/AddProducts/AddProducts";
import Orders from "./pages/Orders/Orders";
import Advertise from "./pages/Advertise/Advertise";
import Revenue from "./pages/Revenue/Revenue"
import Notification from "./pages/Admin/Notification";
>>>>>>> 4dc1b09f92d0e19d6696ecc47c26cb6055d56be5
import News from "./pages/News/News";

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
            { path: "mypond", element: <MyPond /> },
            { path: "pondadd", element: <PondAdd /> },
            { path: "pondlist", element: <PondList /> },
            { path: "pondlist/pondinfo/:id", element: <PondInfo /> },
            { path: "store", element: <Store /> },
            { path: "/userhome/store/:id", element: <Details /> },
            { path: "", element: <Navigate to="mypond" replace /> },
          ],
        },
      ],
    },
    { path: "news", element: <News /> },
    {
      path: "admin",
      element: <Admin />,
      children: [
        { path: "userInfo", element: <UserInfo /> },
        { path: "", element: <Navigate to="userInfo" replace /> },
<<<<<<< HEAD
        { path: "dashboard", element: <Dashboard /> },
=======
>>>>>>> 4dc1b09f92d0e19d6696ecc47c26cb6055d56be5
      ],
    },
    {
      path: "/shop",
      element: <Shop />,
      children: [
        { path: "userInfo", element: <UserInfo /> },
        { path: "", element: <Navigate to="userInfo" replace /> },
        { path: "HomeForShop", element: <HomeForShop /> },
        { path: "Product", element: <ShowProduct /> },
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
