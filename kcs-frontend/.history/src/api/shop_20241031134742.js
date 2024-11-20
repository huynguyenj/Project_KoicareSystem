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

export const getAllOrders  = async () => {

      try {

            const token = localStorage.getItem('token')
            if (!token) {
                  throw new Error('Token not find')
            }

            const res = await axios.get(REST_API_BASE_URL + '/getOrder', {
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

export const getShopInfo  = async () => {

      try {

            const token = localStorage.getItem('token')
            if (!token) {
                  throw new Error('Token not find')
            }

            const res = await axios.get(REST_API_BASE_URL + '/getShop', {
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

export const updateShop  = async (shopId,shopInfo) => {

      try {

            const token = localStorage.getItem('token')
            if (!token) {
                  throw new Error('Token not find')
            }

            const res = await axios.put(REST_API_BASE_URL + `/updateShop/${shopId}`,shopInfo, {
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

export const deleteOrder = async (orderId) =>{
      const token = localStorage.getItem('token')
      if (!token) {
            throw new Error('Token not find')
      }
      await axios.delete('http://localhost:8081/')
}

