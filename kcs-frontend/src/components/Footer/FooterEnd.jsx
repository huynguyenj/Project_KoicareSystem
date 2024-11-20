import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faPinterest, faTelegram } from "@fortawesome/free-brands-svg-icons";

function FooterEnd() {
  const footerStyle = {
    backgroundColor: "#212121",
    padding: "10px",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between", // Căn đều các phần tử
    alignItems: "center", // Căn giữa theo chiều dọc
  };

  const footerText = {
    textAlign: "center", // Căn giữa nội dung
    flex: 1, // Để chiếm không gian còn lại
    fontFamily: "JetBrains Mono",
    fontSize: "15px",
  };

  const iconStyle = {
    margin: "0 15px",
    fontSize: "24px", // Kích thước biểu tượng
  };

  const socialIconsStyle = {
    display: "flex",
    alignItems: "center", // Căn giữa biểu tượng với chữ
  };

  return (
    <div style={footerStyle}>
      <div style={footerText}>
        &copy; 2024 Bảo lưu mọi quyền, Koiday&reg;
        <br />
        Chính sách quyền riêng tư | Điều khoản
      </div>
      <div className="social-icons" style={socialIconsStyle}>
        <a href="#" aria-label="Facebook">
          <FontAwesomeIcon icon={faFacebook} style={iconStyle} />
        </a>
        <a href="#" aria-label="Telegram">
          <FontAwesomeIcon icon={faTelegram} style={iconStyle} />
        </a>
        <a href="#" aria-label="Pinterest">
          <FontAwesomeIcon icon={faPinterest} style={iconStyle} />
        </a>
      </div>
    </div>
  );
}

export default FooterEnd;
