import axios from 'axios'
const REST_API_BASE_URL = "http://localhost:8081";

export const register = (userInfo) => axios.post(REST_API_BASE_URL + '/api/register', userInfo)
export const login =async(userInfo) => {
      try {
            
      } catch (error) {
            
      }
      
export const getMyInfo = ()=>axios.get.post(REST_API_BASE_URL+'/api/myInfo')