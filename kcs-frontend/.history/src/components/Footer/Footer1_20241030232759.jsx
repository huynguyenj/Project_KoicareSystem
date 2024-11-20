import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faPinterest,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const footerStyle = {
    backgroundColor: "#212121",
    padding: "20px 0",
    color: "#fff",
    width: "100%",
    position:'absolute',
   
    bottom:'0'
  };

  const socialIconsStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    fontSize: "20px",
    marginTop: "10px",
  };

  const iconLinkStyle = {
    color: "#fff",
    transition: "color 0.3s ease",
  };

  const iconHoverStyle = {
    color: "#4a90e2",
  };

  return (
    <div style={footerStyle}>
      <div style={{ fontSize: "15px", marginBottom: "10px" }}>
        &copy; 2024 Bảo lưu mọi quyền, Koiday&reg;
        <br />
        Chính sách quyền riêng tư | Điều khoản
      </div>
      <div className="social-icons" style={socialIconsStyle}>
        <a href="https://facebook.com" style={iconLinkStyle} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} style={iconHoverStyle} />
        </a>
        <a href="https://telegram.com" style={iconLinkStyle} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTelegram} style={iconHoverStyle} />
        </a>
        <a href="https://pinterest.com" style={iconLinkStyle} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faPinterest} style={iconHoverStyle} />
        </a>
      </div>
    </div>
  );
}

export default Footer;
