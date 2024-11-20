import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar.jsx";
import { Outlet, useLocation } from "react-router-dom";
import NavbarUser from "../NavbarAfterLogin/NavbarUser.jsx";
import { logout } from "../../api/userService.js";

function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  useEffect(() => {
   
    const storedUserInfo = localStorage.getItem("userInfo");
    

    if (storedUserInfo) {
      // const parsedUserInfo = JSON.parse(storedUserInfo);
      setUser(parsedUserInfo);
      setIsLoggedIn(true);
    }
  }, [location]);

  // Function to handle logout, switching to Navbar when logged out
  const handleLogout = async() => {
    await logout();
    localStorage.removeItem("userInfo");
    setIsLoggedIn(false);
    setUser(null);
    
  };

  const hideNavbar = location.pathname.startsWith("/userhome");

  return (
    <div>
      {!hideNavbar &&
        (isLoggedIn ? (
          <NavbarUser user={user} onLogout={handleLogout} /> // Pass logout function to NavbarUser
        ) : (
          <Navbar /> // Show regular Navbar when logged out
        ))}
      <Outlet />
    </div>
  );
}

export default Layout;
