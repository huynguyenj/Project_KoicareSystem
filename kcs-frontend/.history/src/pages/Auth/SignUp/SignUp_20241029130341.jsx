import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../../../api/userService";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast

function SignUp() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(true);
  const [role, setRole] = useState("USER");
  const navigate = useNavigate();

  function changePage() {
    navigate("/login");
  }

 const [errors, setErrors] = useState({ email: "", phone: "" });


  async function handleSubmit(event) {
    event.preventDefault();

    const userInfo = {
      userName: userName,
      password: password,
      phone: phone,
      email: email,
      status: status,
      role: role
    };

    await registerUser(userInfo);
  }

  async function registerUser(userInfo) {
    try {

      setErrors({ email: "", phone: "" }); // Reset errors

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userInfo.email)) {
          setErrors((prev) => ({ ...prev, email: "Vui lòng nhập đúng định dạng gmail có @." }));
          return;
      }
  
      // Validate phone number
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(userInfo.phone)) {
          setErrors((prev) => ({ ...prev, phone: "Vui lòng nhập 10 chữ số." }));
          return;
      }

      if(!userInfo.useName || userInfo.userName.trim() == "")
      const response = await register(userInfo,role);
      console.log(response.data.result);
      toast.success("Đăng ký thành công!")
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Đăng ký thất bại! Hãy thử lại.")
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
    registerBox: {
      width: "400px",
      marginTop: "50px",
      backgroundColor: "rgba(240, 240, 240, 0.9)",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
    },
    formLink: {
      color: "red",
      fontSize: "18px",
    },
    textCenter: {
      textAlign: "center",
    },
  };

  return (
    <div style={styles.page}>
      <ToastContainer
       position="top-right" 
       autoClose={2000} 
       hideProgressBar={false} 
       closeOnClick 
       pauseOnHover 
       draggable 
       pauseOnFocusLoss/>
      <img style={styles.bgImage} src="/BG.jpg" alt="Background" />
      <Container style={styles.container}>
        <Row>
          <Col>
            <div style={styles.registerBox}>
              <div className="d-flex justify-content-between mb-3">
                <Button
                  variant="danger"
                  className="w-50"
                  style={{ marginRight: "20px" }}
                >
                  Đăng Ký
                </Button>
                <Button variant="light" className="w-50" onClick={changePage}>
                  Đăng Nhập
                </Button>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername" className="">
                  <Form.Control
                    type="text"
                    placeholder="Tên đăng nhập"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="">
                  <Form.Control
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formEmail" className="">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    error={!!errors.email} // Set error state
                    helperText={errors.email} // Display error message
                  />
                </Form.Group>
                <Form.Group controlId="formPhone" className="">
                  <Form.Control
                    type="number"
                    placeholder="Số điện thoại"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    error={!!errors.phone} // Set error state
                    helperText={errors.phone} // Display error message
                  />
                     <Form.Group controlId="formRole" className="mt-3">
                  <Form.Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
              
                    <option value="USER">Người dùng</option>
                    <option value="SHOP">Shop</option>
                   
                    {/* Add more roles as needed */}
                  </Form.Select>
                </Form.Group>
                </Form.Group>
                <div className="text-end"></div>
                <Button variant="primary" type="submit" className="w-100">
                  Đăng ký
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
                Bạn có tài khoản rồi? Hãy{" "}
                <span>
                  <a
                    href="#"
                    style={{ fontSize: "18px" }}
                    className="form-link"
                    onClick={changePage}
                  >
                    Đăng nhập
                  </a>
                </span>{" "}
                trước khi đăng ký.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignUp;
