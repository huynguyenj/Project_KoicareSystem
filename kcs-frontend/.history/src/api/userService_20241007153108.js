import axios from 'axios'
const REST_API_BASE_URL = "http://localhost:8081";

export const register = (userInfo) => axios.post(REST_API_BASE_URL + '/api/register', userInfo)
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
      
export const getMyInfo = async ()=>{
      try {
            const token = localStorage.getItem('token')
            if(!token){
                  throw new Error('Token not find')
            }
            const res = await axios.get(REST_API_BASE_URL+'/api/myInfo',{
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            })
            return res.data;
      } catch (error) {
            console.log("",error)
      }
      

}
export const logout = async ()=>{
      try {
            cons
            const res = await axios.post(REST_API_BASE_URL+'logout')
            
      } catch (error) {
            console.log(error)
      }
}