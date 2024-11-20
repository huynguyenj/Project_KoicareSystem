import axios from 'axios'
const REST_API_BASE_URL = "http://localhost:8081/payment";

export const addProduct  = async (paymentInfo) => {

      try {

            const token = localStorage.getItem('token')
            if (!token) {
                  throw new Error('Token not find')
            }

            const res = await axios.post(REST_API_BASE_URL + '/create', paymentInfo, {
                  headers: {
                        'Authorization': `Bearer ${token}`,
                      
                  }
            })
            return res.data;
      } catch (error) {
            console.log("", error)
            throw error
      }
}

export const getAllHistory = async () => {
      try {
            const token = localStorage.getItem('token')
            if (!token) {
                  throw new Error('Token not find')
            }
            const res = await axios.get(REST_API_BASE_URL + '/history', {
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            })
            return res.data;
      } catch (error) {
            console.log("", error)
            throw error
      }
}

export const verifyPayment = async () => {
      try {
            const token = localStorage.getItem('token')
            if (!token) {
                  throw new Error('Token not find')
            }
            const res = await axios.get(REST_API_BASE_URL + '/verify', {
                  headers: {
                        Authorization: `Bearer ${token}`
                  },
                  params:
            })
            return res.data;
      } catch (error) {
            console.log("", error)
            throw error
      }
}

