import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { verifyPayment } from '../../api/payment';

function PaymentSuccess() {
\
      useEffect(()=>{
            const param = new URLSearchParams(window.location.search)
            const txnRef = param.get('vnp_TxnRef')
           
            const verifyPayments = async ()=>{
                  try {
                        const res = await verifyPayment(txnRef)

                        if(res.reslut=="Payment success!"){
                            const formData = localStorage.getItem("orderDetail")
                            console.log(formData)
                        }
                  } catch (error) {
                        console.log(error)     
                  }
            } 
      },[])    
      
return (
    <div>PaymentSuccess</div>
  )
}

export default PaymentSuccess