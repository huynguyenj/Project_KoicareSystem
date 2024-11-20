import React from "react";
import NavbarUser from "../../components/NavbarAfterLogin/NavbarUser";


function User() {
  const bgStyle = {
    zIndex: "1",
    width: "100%",
    height: "100%",
    position: "absolute", 
    objectFit: "cover", 
  };

  const coverStyle = {
    position: "absolute",
    display: "flex",
    fontSize: "70px",
    top: "10%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: '#A77339',
    borderRadius: '10px',
    padding: '2px 15px',
    zIndex: "2", 
    color: "#fff",
  };

  const containerStyle = {
    position: "relative", 
    width: "100%",
    height: "100vh", 
    overflow: "hidden", 
  };

  return (
    <div>
      <NavbarUser />
      <div style={containerStyle}>
        <img src="/BG2.jpg" alt="background" style={bgStyle} />
        <h1 style={coverStyle}>Welcome</h1>
      </div>
    </div>
  );
}

export default User;
