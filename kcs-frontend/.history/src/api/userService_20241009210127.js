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
            throw error
      }
      

}
export const logout = async ()=>{
      try {

            const token = localStorage.getItem('token')

            const requestBody = {
                  token: token
              };
      
            await axios.post(REST_API_BASE_URL+'/auth/logout',requestBody)
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo')
            
      } catch (error) {
            console.log(error)
      }
}

export const getAllUser = async ()=>{
      try {
            const token = localStorage.getItem('token')
            if(!token){
                  throw new Error('Token not find')
            }
            const res = await axios.get(REST_API_BASE_URL+'/api/getUsers',{
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            })
            return res.data;
      } catch (error) {
            console.log("",error)
            throw error
      }
      

}

export const deleteUser = async(userId)=>{
      try {
            const token = localStorage.getItem('token')
            if(!token){
                  throw new Error('Token not find')
            }
            const res = await axios.delete(`${REST_API_BASE_URL}/api/delete/${userId}`,{
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            })
            return res.data;
      } catch (error) {
            console.log("",error)
            throw error
      }
}

export const setStatusUser = async(userId,decision)=>{
      try {
            const token = localStorage.getItem('token')
            if(!token){
                  throw new Error('Token not find')
            }
            const res = await axios.delete(`${REST_API_BASE_URL}/api/setStatus/${userId}`,{
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            })
            return res.data;
      } catch (error) {
            console.log("",error)
            throw error
      }
}