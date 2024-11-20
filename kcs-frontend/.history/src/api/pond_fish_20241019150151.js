import axios from 'axios'
const REST_API_BASE_URL = "http://localhost:8081/pond";

export const addPond =async(pondInfo) => {
      try {

            const res = await axios.post(REST_API_BASE_URL + '/add_Pond', userInfo)
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