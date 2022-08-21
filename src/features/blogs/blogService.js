import axios from "axios";
import { id } from "ethers/lib/utils";

// const API_URL='http://localhost:8000/api/blogs/';
const API_URL='https://react-app-bay-rho.vercel.app/api/blogs/';

// Create new blog

const createBlog=async(blogData,token)=>{
    console.log("form dat",blogData)

    const config={
        headers:{
            'Authorization':`Bearer ${token}`,
            'content-type': 'multipart/form-data'
        }
    }
    const response=await axios.post(API_URL,blogData,config)
    if(response.data.title){
    window.location.assign("/"+response.data.title)}
        return response.data
}

// get blogs

const getBlogs=async()=>{
    const response=await axios.get(API_URL)
    return response.data;
}
// delete blog

const deleteBlog=async(blogId,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response=await axios.delete(API_URL+ blogId,config)
    console.log("applided for deleting",response.data)
    return response.data;
}
// update blog

const updateBlogText=async(obj,token)=>{
    console.log("from blogSlice updateblog",obj.id,obj.text,"text")
    console.log("from blogService updateblog")
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response=await axios.patch(API_URL+obj.id,{text:obj.text},config)
    console.log("updated",response.data)
    return response.data;
}
// update blog


const updateBlog=async(data,token)=>{
    const config={
        headers:{
            'Authorization':`Bearer ${token}`,
            'content-type': 'multipart/form-data',
            // 'bounary':"my-updates"
        }
    }
    const response=await axios.put(API_URL+data.id,data.data,config)
    console.log("updated",response.data,"from backend")
    return response.data;
}
const blogService={
    createBlog,
    getBlogs,
    deleteBlog,
    updateBlogText,
    updateBlog
}

export default blogService;