import axios from 'axios'
const REST_API_BASE_URL = "http://localhost:8081/product";

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

export const getAllProduct = async () => {
      try {
            const token = localStorage.getItem('token')
            if (!token) {
                  throw new Error('Token not find')
            }
            const res = await axios.get(REST_API_BASE_URL + '/all', {
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

export const deleteFish = async (fishId) => {
      try {
            const token = localStorage.getItem('token')
            if (!token) {
                  throw new Error('Token not find')
            }
            await axios.delete(`${REST_API_BASE_URL_FISH}/delete_Fish/${fishId}`, {
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            })
      } catch (error) {
            console.log("", error)
            throw error
      }
}     