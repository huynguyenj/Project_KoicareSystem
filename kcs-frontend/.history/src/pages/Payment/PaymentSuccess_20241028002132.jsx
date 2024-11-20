import React, { useEffect } from 'react'

import { verifyPayment } from '../../api/payment';

function PaymentSuccess() {

      useEffect(()=>{
            const param = new URLSearchParams(window.location.search)
            const params = {};

// Populate the params object with the key-value pairs from the URL
urlParams.forEach((value, key) => {
  params[key] = value;
});

// Log or inspect params to verify it contains all query parameters
console.log(params);
            const verifyPayments = async ()=>{
                  try {
                        const res = await verifyPayment(txnRef)

                        if(res.reslut=="Payment success!"){
                        //     const formData = localStorage.getItem("orderDetail")
                        //     console.log(formData)
                        console.log("Hello")
                        }
                  } catch (error) {
                        console.log(error)     
                  }
            }
            verifyPayments() 
           
      },[])    
      
return (
    <div>PaymentSuccess</div>
  )
}

export default PaymentSuccess