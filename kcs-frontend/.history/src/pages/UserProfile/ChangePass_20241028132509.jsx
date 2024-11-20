import { Box, Card, TextField } from '@mui/material';
import React, { useState } from 'react'

function ChangePass() {
      const [oldPass, setOldPass] = useState('');
      const [newPass,setNewPass] = useState('');

  return (
    <div>
            <Box maxWidth={450}>
                  <Card >
                     <TextField
                        
                     ></TextField>   
                  </Card>
            </Box>
    </div>
  )
}

export default ChangePass