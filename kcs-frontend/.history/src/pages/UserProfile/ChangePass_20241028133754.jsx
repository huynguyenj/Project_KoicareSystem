import { Box, Card, TextField } from '@mui/material';
import React, { useState } from 'react'
import { checkPassword } from '../../api/userService';

function ChangePass() {
      const [oldPass, setOldPass] = useState('');
      const [newPass,setNewPass] = useState('');
      const [message,setMessage] = useState('')
      
      const checkPass = async ()=>{
            try {
                  const res = await checkPassword(oldPass)
                  if(res.result =='correct'){
                        setMessage('correct')
                  }else{
                        setMessage('wrong')
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
                      onChange={(e)=> setOldPass(e.target.value)} 
                     ></TextField>
                     {er}   
                  </Card>
            </Box>
    </div>
  )
}

export default ChangePass