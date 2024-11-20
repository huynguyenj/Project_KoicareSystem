import React from 'react';
import './NavbarShop.css';

function NavbarShop() {

  const username = "Xin chào user !!!";
  const profileImage = "/Avatar.jpg";
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="/Logo.png" alt="Logo" className="logo" />
      </div>
      <ul className="navbar-menu">
        <li className="navbar-item-text">Thông tin chung</li>
        <li className="navbar-item-text">Tin tức & Blog</li>
        <li className="navbar-item-user-info">
          <img src={profileImage} alt="User Avatar" className="profile-image" />
          <span className="username">{username}</span>
        </li>
      </ul>
    </nav>
  );
}

export default NavbarShop;
