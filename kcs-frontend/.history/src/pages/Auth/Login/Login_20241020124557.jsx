import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getMyInfo, login } from "../../../api/userService";


function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function changePage() {
    navigate("/register");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const userInfo = {
      userName: userName,
      password: password,
    };

    // Call the login API function
    await loginUser(userInfo);
  }

  async function loginUser(userInfo) {
    try {
      await login(userInfo);
      const resUserInfo = await getMyInfo()
      const userData = {
        userName: resUserInfo.result.userName,
      };
      
      localStorage.setItem("userInfo", JSON.stringify(userData));

      alert("Login successfully!");
      if (resUserInfo.result.roles?.[0].userType == "USER") {
        navigate(`/`);
      } else if(resUserInfo.result.roles?.[0].userType == "ADMIN") {
        navigate("/admin");
      }else{
        navigate("/shop")
      }
      // Navigate to home or a specific page
    } catch (error) {
      console.error("Login error:", error);
      alert("Your username or password is incorrect! Please try again.");
    }
  }

  // Inline styles for the component
  const styles = {
    page: {
      position: "relative",
      width: "100%",
      height: "100vh",
      overflow: "hidden",
      font: "600 15px/18px 'Open Sans', sans-serif",
    },
    bgImage: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: -1,
    },
    container: {
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    loginBox: {
      width: "400px",
      backgroundColor: "rgba(240, 240, 240, 0.9)",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
    },
    formLink: {
      color: "red",
      fontSize: "18px",
    },
    formLinkHover: {
      textDecoration: "underline",
    },
    textCenter: {
      textAlign: "center",
    },
  };

  return (
    <div style={styles.page}>
      <img style={styles.bgImage} src="/BG.jpg" alt="Background" />
      <Container className="login-container" style={styles.container}>
        <Row>
          <Col>
            <div style={styles.loginBox}>
              <div className="d-flex justify-content-between mb-3">
                <Button
                  variant="light"
                  className="w-50"
                  style={{ marginRight: "20px" }}
                  onClick={changePage}
                >
                  Đăng Ký
                </Button>
                <Button variant="danger" className="w-50">
                  Đăng Nhập
                </Button>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Tên đăng nhập"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Đăng nhập
                </Button>
              </Form>
              <p
                className="mt-3"
                style={{
                  ...styles.textCenter,
                  fontSize: "13px",
                  margin: "auto",
                }}
              >
                Bạn chưa có tài khoản? Hãy{" "}
                <a href="#" onClick={changePage} style={{ fontSize: "18px" }}>
                  Đăng ký
                </a>{" "}
                trước khi đăng nhập.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
