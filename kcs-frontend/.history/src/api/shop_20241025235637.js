import axios from 'axios'
const REST_API_BASE_URL = "http://localhost:8081/shop";

export const addProduct  = async (productInfo) => {

      try {

            const token = localStorage.getItem('token')
            if (!token) {
                  throw new Error('Token not find')
            }

            const res = await axios.post(REST_API_BASE_URL + '/create', productInfo, {
                  headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                  }
            })
            return res.data;
      } catch (error) {
            console.log("", error)
            throw error
      }
}

export const getAll  = async (productInfo) => {

      try {

            const token = localStorage.getItem('token')
            if (!token) {
                  throw new Error('Token not find')
            }

            const res = await axios.post(REST_API_BASE_URL + '/create', productInfo, {
                  headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                  }
            })
            return res.data;
      } catch (error) {
            console.log("", error)
            throw error
      }
}
