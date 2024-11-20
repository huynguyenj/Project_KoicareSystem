import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "./pages/Guest/Home/Home";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/SignUp/SignUp";
import UserProfile from "./pages/UserProfile/UserProfile";
import User from "./pages/User/User";
import Layout from "./components/Layout";
import Drawers from "./components/Drawers";
// import NavbarUser from "./components/NavbarAfterLogin/NavbarUser";

import MyFish from "./pages/MyFish/FishAdd";
import MyPond from "./pages/MyPond/MyPond";
import Admin from "./components/Drawers/Admin";
import Shop from "./components/Drawers/Shop";
import Dashboard from "./pages/Admin/Dashboard";
import UserInfo from "./pages/Admin/UserInfo";
import HomeForShop from "./pages/HomeForShop/HomeForShop";
import ShowProduct from "./pages/Products/ShowProducts/ShowProducts";
import Notification from "./pages/Admin/Notification";
import FishList from "./pages/MyFish/MyFish";
import PondAdd from "./pages/MyPond/PondAdd";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "userpage", element: <User /> },
        {
          path: "userhome",
          element: <Drawers />,
          children: [
            { path: "userprofile", element: <UserProfile /> },
            { path: "myfish", element: <MyFish /> },
            { path: "myfishlist", element: <FishList /> },
            { path: "mypond", element: <MyPond /> },
            { path: "pondadd", element: <PondAdd/> },
            { path: "", element: <Navigate to="mypond" replace /> },
          ],
        },
      ],
    },
    {
      path:'admin',
      element:<Admin/>,
      children: [
        { path: "userInfo", element: <UserInfo /> },
        { path: "", element: <Navigate to="userInfo" replace /> },
        { path: "HomeForShop", element: <HomeForShop /> },

      ],
    },
    {
      path: "shop",
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
      {/* <Admin />
      <Dashboard /> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
