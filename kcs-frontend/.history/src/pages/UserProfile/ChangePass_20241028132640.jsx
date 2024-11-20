import { Box, Card, TextField } from '@mui/material';
import React, { useState } from 'react'

function ChangePass() {
      const [oldPass, setOldPass] = useState('');
      const [newPass,setNewPass] = useState('');

  return (
    <div>
            <Box maxWidth={500} sx={{margin:'auto'}}>
                  <Card el>
                     <TextField
                      label="Mật khẩu hiện tại"  
                     ></TextField>   
                  </Card>
            </Box>
    </div>
  )
}

export default ChangePass