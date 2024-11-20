import axios from 'axios'
const REST_API_BASE_URL = "http://localhost:8081/pond";
const REST_API_BASE_URL_FISH = "http://localhost:8081/fish";

//Pond
export const addPond =async(pondInfo) => {
 
            try {
                
                  const token = localStorage.getItem('token')
                  if(!token){
                        throw new Error('Token not find')
                  }
                  
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

export const getAllPond = async ()=>{
      try {
            const token = localStorage.getItem('token')
            if(!token){
                  throw new Error('Token not find')
            }
            const res = await axios.get(REST_API_BASE_URL+'/getAllPond',{
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

export const deletePond = async(pondId)=>{
      try {
            const token = localStorage.getItem('token')
            if(!token){
                  throw new Error('Token not find')
            }
            await axios.delete(`${REST_API_BASE_URL}/delete_Pond/${pondId}`,{
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            })
      } catch (error) {
            console.log("",error)
            throw error
      }
}

export const getPond = async(pondId)=>{
      try {
            const token = localStorage.getItem('token')
            if(!token){
                  throw new Error('Token not find')
            }
            const res = await axios.get(`${REST_API_BASE_URL}/getPondInfo/${pondId}`,{
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

//Fish
export const addFish =async(fishInfo) => {
 
      try {
          
            const token = localStorage.getItem('token')
            if(!token){
                  throw new Error('Token not find')
            }
            
            const res = await axios.post(REST_API_BASE_URL_FISH + '/add_Fish', fishInfo ,{
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

export const getAllFish = async ()=>{
      try {
            const token = localStorage.getItem('token')
            if(!token){
                  throw new Error('Token not find')
            }
            const res = await axios.get(REST_API_BASE_URL+'/getAllPond',{
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
