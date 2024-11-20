import { HashLink } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserTie,
  faCartShopping,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useRef, useEffect } from "react";
import "./NavbarUser.css";
function NavbarUser({ user, onLogout }) {
  // Accept the logout function as a prop
  const navigator = useNavigate();

  const handleLogout = () => {
    onLogout();
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  function changeUserProfilePage() {
    navigator("/userhome");
  }

  // Define inline styles
  const navbarStyle = {
    backgroundColor: "black",
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1,
    padding: "0px 10px",
    opacity: 0.78,
  };

  const navItemStyle = {
    color: "white",
    fontSize: "20px",
    textDecoration: "none",
    paddingBottom: "5px",
    fontFamily: "JetBrains Mono",
  };

  const avatarStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "10px",
    marginBottom: "20px"
  };

  const dropdownMenuStyle = {
    position: "absolute",
    top: "100%",
    right: 0,
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "5px",
    zIndex: 1000,
    display: isDropdownOpen ? "block" : "none",
    width: "200px",
  };

  const dropdownItemStyle = {
    padding: "10px 20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    borderBottom: "1px solid #ddd",
  };

  return (
    <nav className="navbar d-flex" style={navbarStyle}>
      <HashLink to="/">
        <img
          className="logo ms-5"
          src="/Logo.png"
          alt=""
          style={{ maxWidth: "150px" }}
        />
      </HashLink>
      <div className="navbar-right d-flex ms-auto align-items-center">
        <HashLink
          smooth
          to="/#about"
          className="nav-item ms-4"
          style={navItemStyle}
        >
          Thông tin chung
        </HashLink>
        <HashLink
          smooth
          to="/#blog"
          className="nav-item ms-4"
          style={navItemStyle}
        >
          Tin tức và blog
        </HashLink>
        <a
          className="nav-item ms-4"
          href="#"
          onClick={changeUserProfilePage}
          style={navItemStyle}
        >
          <FontAwesomeIcon icon={faUserTie} style={{ color: "#ffffff" }} />
        </a>
        <a className="nav-item ms-4" href="#" style={navItemStyle}>
          <FontAwesomeIcon icon={faCartShopping} style={{ color: "#ffffff" }} />
        </a>

        {/* User Profile and Logout */}
        <div
          className="dropdown profile-menu ms-4 me-4"
          style={{ position: "relative" }}
        >
          <button
            className="dropdown-toggle"
            onClick={toggleDropdown}
            style={{
              background: "none",
              border: "none",
              color: "#F4CD79",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src='Avatar.jpg' alt="User Avatar" style={avatarStyle} />
            <span style={{ color: "#F4CD79", marginRight: "5px" }}>
              {user!=null? user:handleLogout()}
            </span>
          </button>

          {/* Dropdown menu */}
          <ul
            className="dropdown-menu"
            style={dropdownMenuStyle}
            ref={dropdownRef}
          >
            <li style={dropdownItemStyle} onClick={changeUserProfilePage}>
              <FontAwesomeIcon icon={faUserTie} />
              <span>Tài khoản</span>
            </li>
            <li style={dropdownItemStyle} onClick={onLogout}>
              {" "}
              {/* Call logout function */}
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span onClick={handleLogout}>Log Out</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarUser;
