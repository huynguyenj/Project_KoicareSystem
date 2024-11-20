import axios from 'axios'
const REST_API_BASE_URL = "http://localhost:8081/pond";

export const addPond =async(pondInfo) => {
 
            try {
                
                  const token = localStorage.getItem('token')
                  if(!token){
                        throw new Error('Token not find')
                  }
                  const formData = new FormData();
                  Object.keys(pondInfo).forEach((key) => {
                      formData.append(key, pondInfo[key]);
                  });
                  const res = await axios.post(REST_API_BASE_URL + '/add_Pond', pondInfo ,{
                        headers: {
                              'Authorization': `Bearer ${token}`,
                              'Content-Type': 'multipart/form-data',
                        }
                  })
                  return res.data;
            } catch (error) {
                  console.log("",error)
                  throw error
            }
}