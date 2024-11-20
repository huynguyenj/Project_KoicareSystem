import axios from 'axios'
const REST_API_BASE_URL = "http://localhost:8081/pond";

export const login =async(userInfo) => {
      try {

            const res = await axios.post(REST_API_BASE_URL + '/auth/login', userInfo)
            const token = res.data.result.token;
            localStorage.setItem('token',token)
            
            return res.data
           
      
      } catch (error) {
            console.log("Can not get data",error)
            throw error
      }
}