import axios from 'axios'
const REST_API_BASE_URL = "http://localhost:8081";

export const register = (userInfo, role) => 
      axios.post(`${REST_API_BASE_URL}/api/register?userRoleChoice=${role}`, userInfo);

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

export const updateInfo =async (userId, userInfo)=>{
      try {
            const token = localStorage.getItem('token')
            if(!token){
                  throw new Error('Token not find')
            }
            const res = await axios.put(REST_API_BASE_URL+`/api/update_User/${userId}`,userInfo,{
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
            localStorage.clear();
            
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
            await axios.delete(`${REST_API_BASE_URL}/api/delete/${userId}`,{
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            })
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
            const res = await axios.put(`${REST_API_BASE_URL}/api/setStatus/${userId}`,null,{
                  headers: {
                        Authorization: `Bearer ${token}`
                  },
                  params: {
                        decision,
                  },
            }    
      )
            return res.data;
      } catch (error) {
            console.log("",error)
            throw error
      }
}

export const setRoleUser = async(userId,role)=>{
      try {
            const token = localStorage.getItem('token')
            if(!token){
                  throw new Error('Token not find')
            }
            const res = await axios.put(`${REST_API_BASE_URL}/api/setRole/${userId}`,null,{
                  headers: {
                        Authorization: `Bearer ${token}`
                  },
                  params: {
                        role,
                  },
            }    
      )
            return res.data;
      } catch (error) {
            console.log("",error)
            throw error
      }
}

export const trackingUser = async()=>{
      try {
            const token = localStorage.getItem('token')
            if(!token){
                  throw new Error('Token not find')
            }
            const res = await axios.get(`${REST_API_BASE_URL}/auth/trackingLogin`,{
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            }    
      )
            return res.data;
      } catch (error) {
            console.log("",error)
            throw error
      }
}

export const postBlog = async(blogData)=>{
      try {
            const token = localStorage.getItem('token')
            if(!token){
                  throw new Error('Token not find')
            }
            await axios.post(`${REST_API_BASE_URL}/api/user/postBlog`,blogData,{
                  headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                  }
            }
      )
            
      } catch (error) {
            console.log(error)
            throw error
      }
}

export const getAllBlog = async()=>{
      try {
            const token = localStorage.getItem('token')
            if(!token){
                  throw new Error('Token not find')
            }
            const res = await axios.get(`${REST_API_BASE_URL}/api/user/getAllBlogs`)
            //       ,{
            //       headers: {
            //             Authorization: `Bearer ${token}`,
                       
            //       }
            // })
            return res.data
      }catch(error){
            console.log(error)
            throw error
}

}

export const getBlogInfo = async (blogId) =>{
      try {
            const token = localStorage.getItem('token')
            if(!token){
                  throw new Error('Token not find')
            }
            const res = await axios.get(`${REST_API_BASE_URL}/api/user/getBlog/${blogId}`
                  // ,{
                  // headers: {
                  //       Authorization: `Bearer ${token}`,
                       
                  // }}
            )
            return res.data
      } catch (error) {
            console.log(error)
            throw error
      }
}

export const getMyBlogs = async ()=>{
      try {
            const token = localStorage.getItem('token')
            if(!token){
                  throw new Error('Token not find')
            }
            const res = await axios.get(`${REST_API_BASE_URL}/api/user/getMyBlogs`,{
                  headers: {
                        Authorization: `Bearer ${token}`,
                       
                  }
            })
            return res.data
      } catch (error) {
            console.log(error)
            throw error
      }    
}

export const deleteBlog = async (blogId)=>{
      try {
            const token = localStorage.getItem('token')
            if(!token){
                  throw new Error('Token not find')
            }
            const res = await axios.delete(`${REST_API_BASE_URL}/api/user/deleteMyBlog/${blogId}`,{
                  headers: {
                        Authorization: `Bearer ${token}`,
                       
                  }
            })
            return res.data
      } catch (error) {
            console.log(error)
            throw error
      }    
}

export const updateBlog = async (blogId,blogData) =>{
      try {
            const token = localStorage.getItem('token')
            if(!token){
                  throw new Error('Token not find')
            }
            const res = await axios.put(`${REST_API_BASE_URL}/api/user/updateMyBlog/${blogId}`,blogData,{
                  headers: {
                        
                              'Authorization': `Bearer ${token}`,
                              'Content-Type': 'multipart/form-data',
                       
                  }
            })
            return res.data
      } catch (error) {
            console.log(error)
            throw error
      }
}