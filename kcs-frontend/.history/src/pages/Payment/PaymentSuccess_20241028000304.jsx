import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

function PaymentSuccess() {
      const history = useHistory();  
      useEffect(()=>{
            const param = new URLSearchParams(window.location.search)
            const txnRef = param.get()
      })      
return (
    <div>PaymentSuccess</div>
  )
}

export default PaymentSuccess