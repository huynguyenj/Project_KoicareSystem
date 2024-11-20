import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar.jsx";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavbarUser from "../NavbarAfterLogin/NavbarUser.jsx";
import { getMyInfo, logout } from "../../api/userService.js";

function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigator = useNavigate()


  useEffect(() => {
   
    const storedUserInfo =getMyInfo();
    
    if (storedUserInfo) {
      setUser(storedUserInfo.userName);
      setIsLoggedIn(true);
    }else{
      setUser(null)
      setIsLoggedIn(false)
      
    }
  }, [location]);

  // Function to handle logout, switching to Navbar when logged out
  const handleLogout = async() => {
    await logout();
    setIsLoggedIn(false);
    navigator('/login'); // Redirect to login page after logging out
    
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
