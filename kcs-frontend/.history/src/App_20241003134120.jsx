import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Guest/Home/Home";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/SignUp/SignUp";
import UserProfile from "./pages/UserProfile/UserProfile";
import User from "./pages/User/User";
import Layout from "./components/Layout";
import Drawers from "./components/Drawers";
import NavbarUser from "./components/NavbarAfterLogin/NavbarUser";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>, 
      children: [
        { index: true, element: <Home /> }, 
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "userhome", element: <UserProfile /> },
        { path: "userpage", element: <User /> },
      ],
    },
  ]);

  return (
    <>
      {/* <Drawers /> */}
      {/* <NavbarUser /> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
