import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faPinterest,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  // Define the inline styles as objects
  

  const iconStyle = {
    margin: "0 15px",
  };

  const socialIconsStyle = {
    fontSize: "24px",
    display: "flex",
    justifyContent: "center",
    margin: "20px"
  };

  const fontStyle = {
    fontWeight: "bold",
    fontSize: "14px",
    fontFamily: "JetBrains Mono",
  };

  return (
    <>
        <div
          className="row mt-4"
          style={{
            width:'100%',
            backgroundColor: "#212121",
            padding: "10px",
            marginLeft: "0.5px",
            position: "relative",
            color: "#fff",
          }}
        >
          <div
            className="d-flex justify-content-around align-items-center"
            style={fontStyle}
          >
            <div style={{ fontFamily: "JetBrains Mono", fontSize: "15px" }}>
              &copy; 2024 Bảo lưu mọi quyền, Koiday&reg;
              <br />
              Chính sách quyền riêng tư | Điều khoản
            </div>
            <div className="social-icons" style={socialIconsStyle}>
              <a>
                <i style={iconStyle}>
                  <FontAwesomeIcon icon={faFacebook} />
                </i>
              </a>
              <a>
                <i style={iconStyle}>
                  <FontAwesomeIcon icon={faTelegram} />
                </i>
              </a>
              <a>
                <i style={iconStyle}>
                  <FontAwesomeIcon icon={faPinterest} />
                </i>
              </a>
            </div>
          </div>
        </div>
      
    </>
  );
}

export default Footer;