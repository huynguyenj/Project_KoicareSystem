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
   
    const fetchUserInfo = async () => {
      try {
        const response = await getMyInfo(); // Fetch user info from the API
        if (response && response.result) {
          const parsedUserInfo = response.result; // Assuming the user data is in response.result
          
          if (parsedUserInfo.userName) {
            console.log()
            setUser(parsedUserInfo.userName); // Set user name from the fetched data
            setIsLoggedIn(true); // Update logged-in status
          } else {
            console.log("User name not found in the fetched information.");
          }
        } else {
          console.log("No user information found in the response.");
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };
    fetchUserInfo();
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
