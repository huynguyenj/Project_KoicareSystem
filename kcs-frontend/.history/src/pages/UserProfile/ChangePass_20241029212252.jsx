import { Alert, Box, Button, Card, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { changePassword, checkPassword } from "../../api/userService";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
function ChangePass() {
  const [oldPass, setOldPass] = useState({ oldPassword: "" });
  const [newPass, setNewPass] = useState({newPassword: ""});
  const [message, setMessage] = useState("");
  const [checked, setChecked] = useState(false);
  const [show,setShow] = useState(false);
  const [hide,setHide] = useState(false);
  const checkPass = async () => {
    try {
      setChecked(true);
      console.log(oldPass);
      const res = await checkPassword(oldPass);
      if (res.result == "correct") {
        setMessage("Mật khẩu chính xác.");
        setShow(true)
      } else {
        setMessage("Mật khẩu không đúng xin hãy thử lại!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changePass = async () =>{
      try {
            await changePassword(newPass);
            toast.success("Đổi mật khẩu thành công.")
      } catch (error) {
            console.log(error)
            toast.error("Đổi mật khẩu thất bại!")
      }
  }
  return (
    <div>
       <ToastContainer
      position="top-right" 
      autoClose={2000} 
      hideProgressBar={false} 
      closeOnClick 
      pauseOnHover 
      draggable 
      pauseOnFocusLoss/>
      <Box maxWidth={500} sx={{ margin: "auto", marginTop:20 }}>
        <Card elevation={2} sx={{ padding: 3 }}>
          <Typography variant="h5" sx={{mb:2}}>Thay đổi mật khẩu</Typography>
          <TextField
            label="Mật khẩu hiện tại"
            variant="outlined"
            value={oldPass.oldPassword}
            type="password"
            fullWidth
            onChange={(e) => setOldPass({ oldPassword: e.target.value })}
          ></TextField>
        {hide? :<><Button variant="contained" sx={{ mt: 2 }} onClick={checkPass}>
            Xác nhận
          </Button></>}
          
          {/* Show message only if check was attempted */}
          {checked && (
            <Alert
              sx={{ mt: 2 }}
              severity={message === "Mật khẩu chính xác." ? "success" : "error"}
            >
              {message}
            </Alert>
          )}
            { show ? (<>
                  <TextField
            label="Mật khẩu mới"
            variant="outlined"
            value={newPass.newPassword}
            type="password"
            fullWidth
            sx={{mt:2}}
            onChange={(e) => setNewPass({ newPassword: e.target.value })}
          ></TextField>
          <Button variant="contained" sx={{ mt: 2 }} onClick={changePass}>
            Xác nhận
          </Button>
            </> 
          
          ):""}
        
        </Card>
      </Box>
    </div>
  );
}

export default ChangePass;
