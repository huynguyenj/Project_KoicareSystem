import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";
import NavbarUser from "../NavbarAfterLogin/NavbarUser.jsx";

function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user,setUser] = useState(null)

  useEffect(()=>{
    const storedUserInfo = localStorage.getItem('userInfo');
    if(storedUserInfo){
      setUser(JSON.parse(storedUserInfo))
      setIsLoggedIn(true)
    }
  },[])
  // Function to handle logout, switching to Navbar when logged out
  const handleLogout = () => {
    localStorage.removeItem('userInfo')
    setIsLoggedIn(false);
    setUser(null)
  };

  return (
    <div>
      {isLoggedIn ? (
        <NavbarUser user={user} onLogout={handleLogout} /> // Pass logout function to NavbarUser
      ) : (
        <Navbar /> // Show regular Navbar when logged out
      )}
      <Outlet />
    </div>
  );
}

export default Layout;