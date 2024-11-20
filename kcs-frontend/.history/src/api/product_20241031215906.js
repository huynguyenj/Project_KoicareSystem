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

export const getAllProductInShop = async () => {
      try {
            const token = localStorage.getItem('token')
            if (!token) {
                  throw new Error('Token not find')
            }
            const res = await axios.get(REST_API_BASE_URL + '/products', {
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

export const deleteProduct = async (productId) => {
      try {
            const token = localStorage.getItem('token')
            if (!token) {
                  throw new Error('Token not find')
            }
            await axios.delete(`${REST_API_BASE_URL}/delete/${productId}`, {
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            })
      } catch (error) {
            console.log("", error)
            throw error
      }
}     

export const updateProduct = async (productId,data) => {
      try {
            const token = localStorage.getItem('token')
            if (!token) {
                  throw new Error('Token not find')
            }
            await axios.put(`${REST_API_BASE_URL}/update/${productId}`,data, {
                  headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                  }
            })
      } catch (error) {
            console.log("", error)
            throw error
      }
}


export const order  = async (data) => {

      try {

            const token = localStorage.getItem('token')
            if (!token) {
                  throw new Error('Token not find')
            }

            const res = await axios.post(REST_API_BASE_URL + `/order`,data, {
                  headers: {
                        'Authorization': `Bearer ${token}`,
                        
                  },
                 
            })
            return res.data;
      } catch (error) {
            console.log("", error)
            throw error
      }
}


export const getAProduct = async (productId) => {
      try {
            const token = localStorage.getItem('token')
            if (!token) {
                  throw new Error('Token not find')
            }
            const res = await axios.get(REST_API_BASE_URL + `/search/${productId}`, {
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

export const deleteOrderFail = async (orderFail) => {
      try {
            const token = localStorage.getItem('token')
            if (!token) {
                  throw new Error('Token not find')
            }
            await axios.delete(`${REST_API_BASE_URL}/deleteOrderPE`, {
                  headers: {
                        Authorization: `Bearer ${token}`
                  },
                  data: orderFail
            })
      } catch (error) {
            console.log("", error)
            throw error
      }
}     

export const addRating  = async (productId,data) => {

      try {

            const token = localStorage.getItem('token')
            if (!token) {
                  throw new Error('Token not find')
            }

            const res = await axios.post(REST_API_BASE_URL + '/rating`, productInfo, {
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

export const getAllRating = async (productId) => {
      try {
           
            const res = await axios.get(REST_API_BASE_URL + `/rating/getAll/${productId}`, {
                
            })
            return res.data;
      } catch (error) {
            console.log("", error)
            throw error
      }
}
