import { HashLink } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css"
import { getMyInfo } from "../../api/userService";

function Navbar() {
  const navigator = useNavigate();

  function login() {
    navigator("/login");
  }

  function register() {
    navigator("/register");
  }

  async function changeUserProfilePage() {
    tr
    await getMyInfo().then(()=> navigator("/userhome")).catch(()=> alert("Làm ơn đăng nhập để dùng chức năng"))
    // navigator("/userhome");
  }

  function UserPage() {
    navigator("/userpage");
  }

  // Define inline styles as objects
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
    position: "relative",
    color: "white",
    fontSize: "20px",
    textDecoration: "none",
    paddingBottom: "5px",
    fontFamily: "JetBrains Mono",
  };

  const logPartStyle = {
    display: "inline-flex",
    alignItems: "center",
    padding: "5px 15px",
    border: "1px solid #F4CD79",
    borderRadius: "5px",
    color: "#F4CD79",
    fontSize: "20px",
    fontWeight: "bold",
    backgroundColor: "transparent",
    textAlign: "center",
    cursor: "pointer",
    marginBottom: "5px",
  };

  const loginLinkStyle = {
    background: "none",
    border: "none",
    color: "#F4CD79",
    textDecoration: "none",
    marginRight: "5px",
    fontSize: "18px",
    cursor: "pointer",
  };

  const loginLinkHoverStyle = {
    color: "#fff",
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
        <a className="nav-item ms-4" href="#" onClick={UserPage} style={navItemStyle}>
          <FontAwesomeIcon icon={faCartShopping} style={{ color: "#ffffff" }} />
        </a>
        <div className="log-part ms-4 me-4" style={logPartStyle}>
          <button
            className="login-link"
            style={loginLinkStyle}
            onMouseOver={(e) =>
              (e.target.style.color = loginLinkHoverStyle.color)
            }
            onMouseOut={(e) => (e.target.style.color = loginLinkStyle.color)}
            onClick={login}
          >
            Đăng nhập
          </button>{" "}
          /
          <button
            className="login-link"
            style={loginLinkStyle}
            onMouseOver={(e) =>
              (e.target.style.color = loginLinkHoverStyle.color)
            }
            onMouseOut={(e) => (e.target.style.color = loginLinkStyle.color)}
            onClick={register}
          >
            &nbsp;Đăng ký
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
