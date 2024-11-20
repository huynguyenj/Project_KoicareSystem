import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faPinterest,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  // Define the inline styles as objects
  const footerBackgroundStyle = {
    position: "relative",
    width: "100%",
    height: "auto",
    overflow: "hidden",
  };

  const footerContainerStyle = {
    padding: "5px",
    borderRadius: "0px 0px 10px 10px",
    justifyContent: "space-around",
    display: "flex",
    marginLeft: "30px",
    marginRight: "30px",
  };

  const bgImageStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -1,
  };

  const footerDividerStyle = {
    width: "60%",
    border: "none",
    height: "2px",
    backgroundColor: "black",
    margin: "20px 0",
  };

  const footerSectionStyle = {
    flex: 1,
    marginRight: "20px",
    marginTop: "20px",
    color: "black",
    fontWeight: "bold",
  };

  const footerLogoStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "30px",
  };

  const iconStyle = {
    margin: "0 15px",
  };

  const socialIconsStyle = {
    fontSize: "24px",
    display: "flex",
    justifyContent: "center",
    margin: "20px",
  };

  const fontStyle = {
    fontWeight: "bold",
    fontSize: "14px",
    fontFamily: "JetBrains Mono",
  };

  return (
    <>
      <div style={footerBackgroundStyle}>
        <img className="bg-image" src="/BG.jpg" alt="" style={bgImageStyle} />
        <div style={footerContainerStyle}>
          <div style={footerSectionStyle}>
            <h4 style={{ fontFamily: "JetBrains Mono" }}>Địa chỉ khu vực:</h4>
            <ul>
              <li style={{ fontFamily: "JetBrains Mono" }}>
                CS1: Hẻm 212/Đ, Đường Nguyễn Văn Linh, Quận 7
              </li>
              <li style={{ fontFamily: "JetBrains Mono" }}>
                CS2: Số 17 Đường 37, P. Đông Hòa, Quận Cẩm Lệ, Thành Phố Đà Nẵng
              </li>
              <li style={{ fontFamily: "JetBrains Mono" }}>
                CS3: 99 Hồ Thị Tư, Thị Xã Tiền Hải, Tỉnh Thái Bình
              </li>
              <li style={{ fontFamily: "JetBrains Mono" }}>
                CS4: số 11, Phố Gia Thượng, Phường Ngọc Thụy, Quận Long Biên,
                Thành Phố Hà Nội
              </li>
            </ul>
          </div>

          <div style={footerSectionStyle}>
            <h4 style={{ fontFamily: "JetBrains Mono" }}>Chính sách Koiday</h4>
            <hr style={footerDividerStyle} />
            <ul style={{ fontFamily: "JetBrains Mono" }}>
              <li>Mua hàng</li>
              <li>Vận chuyển</li>
              <li>Thanh toán</li>
              <li>Bảo mật</li>
            </ul>
          </div>
          <div style={footerSectionStyle}>
            <h4 style={{ fontFamily: "JetBrains Mono" }}>Chức năng</h4>
            <hr style={footerDividerStyle} />
            <ul>
              <li style={{ fontFamily: "JetBrains Mono" }}>
                Dịch vụ chăm sóc khách hàng
              </li>
              <li style={{ fontFamily: "JetBrains Mono" }}>Bảo dưỡng hồ cá</li>
              <li style={{ fontFamily: "JetBrains Mono" }}>Theo dõi định kỳ</li>
              <li style={{ fontFamily: "JetBrains Mono" }}>
                Bảo hành 12 tháng
              </li>
            </ul>
          </div>
          <div style={footerLogoStyle}>
            <img
              src="/Logo2.png"
              alt="Koiday Logo"
              style={{ width: "190px", objectFit: "contain" }}
            />
          </div>
        </div>

        <div
          className="row mt-5"
          style={{
            backgroundColor: "#212121",
            padding: "1px",
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
      </div>
    </>
  );
}

export default Footer;
