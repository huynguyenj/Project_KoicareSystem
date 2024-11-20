import React, { useEffect, useState } from "react";

import { verifyPayment } from "../../api/payment";

function PaymentSuccess() {

      
      const [params,setParams] = useState({});
//   useEffect(() => {
//     const param = new URLSearchParams(window.location.search);
//     const params = {};

//     // Populate the params object with the key-value pairs from the URL
//     param.forEach((value, key) => {
//       params[key] = value;
//     });

//     // Log or inspect params to verify it contains all query parameters
;
//   }, []);

  return <div>PaymentSuccess</div>;
}

export default PaymentSuccess;
