import { Alert, Box, Button, Card, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { checkPassword } from "../../api/userService";

function ChangePass() {
  const [oldPass, setOldPass] = useState({ oldPassword: "" });
  const [newPass, setNewPass] = useState("");
  const [message, setMessage] = useState("");
  const [checked, setChecked] = useState(false);
  const [show,setShow] = useState(false)
  const checkPass = async () => {
    try {
      setChecked(true);
      console.log(oldPass);
      const res = await checkPassword(oldPass);
      if (res.result == "correct") {
        setMessage("Mật khẩu chính xác.");
      } else {
        setMessage("Mật khẩu không đúng xin hãy thử lại!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Box maxWidth={500} sx={{ margin: "auto" }}>
        <Card elevation={2} sx={{ padding: 3 }}>
          <TextField
            label="Mật khẩu hiện tại"
            variant="outlined"
            value={oldPass.oldPassword}
            type="password"
            fullWidth
            onChange={(e) => setOldPass({ oldPassword: e.target.value })}
          ></TextField>
          <Button variant="contained" sx={{ mt: 2 }} onClick={checkPass}>
            Xác nhận
          </Button>
          {/* Show message only if check was attempted */}
          {checked && (
            <Alert
              sx={{ mt: 2 }}
              severity={message === "Mật khẩu chính xác." ? "success" : "error"}
            >
              {message}
            </Alert>
          )}
            {show ():()}
          <TextField
            label="Mật khẩu hiện tại"
            variant="outlined"
            value={oldPass.oldPassword}
            type="password"
            fullWidth
            sx={{mt:2}}
            onChange={(e) => setOldPass({ oldPassword: e.target.value })}
          ></TextField>
        </Card>
      </Box>
    </div>
  );
}

export default ChangePass;
