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
import MyFish from "./pages/MyFish/FishAdd"
import MyPond from "./pages/MyPond/MyPond"
import Admin from "./components/Drawers/Admin";
import UserInfo from "./pages/Admin/UserInfo";
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
            { path: "mypond", element: <MyPond /> },
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
        { path: "", element: <Navigate to="userInfo" replace /> }
       
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
