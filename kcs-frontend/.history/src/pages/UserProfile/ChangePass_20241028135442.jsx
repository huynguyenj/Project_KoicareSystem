import { Alert, Box, Button, Card, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { checkPassword } from '../../api/userService';

function ChangePass() {
      const [oldPass, setOldPass] = useState({oldPassword:''});
      const [newPass,setNewPass] = useState('');
      const [message,setMessage] = useState('')
      
      const checkPass = async ()=>{
            try {
                  console.log(oldPass)
                  const res = await checkPassword(oldPass)
                  if(res.result =='correct'){
                        setMessage('Mật khẩu chính xác.')
                  }
            } catch (error) {
                  console.log(error)
            }
      }
      

  return (
    <div>
            <Box maxWidth={500} sx={{margin:'auto'}}>
                  <Card elevation={2} sx={{padding:3}}>
                     <TextField
                      label="Mật khẩu hiện tại" 
                      variant='outlined'
                      value={oldPass}
                      type='password'
                      fullWidth
                      onChange={(e)=> setOldPass(...oldPass.target.value)} 
                     ></TextField> 
                     <Button variant='contained' sx={{mt:2}} onClick={checkPass}>Xác nhận</Button>
                    { message ?  <Typography>{message}</Typography> :(<Alert severity="error">Mật khẩu không chính xác!.</Alert>)} 
                  </Card>
            </Box>
    </div>
  )
}

export default ChangePass