import { useState } from "react";
import {createBlog} from "../../features/blogs/blogSlice";
import { useDispatch ,useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { reset } from "../../features/blogs/blogSlice";

import "./newBlog.css";


const NewBlog = () => {
    const [text,setText]=useState("");
    const [title,setTitle]=useState("");
    const [category,setCategory]=useState(2)
    const [imgFile,setImgFile]=useState("")
// 
    const {user}=useSelector((state)=>state.auth)
    const {blogs,isLoading,isError,message}=useSelector((state)=>state.blogs);
// 
    const dispatch=useDispatch();
    const navigate=useNavigate();
// 
    useEffect(()=>{
        if(isError){
          toast.error(message)
        }
        if(!user){
            navigate("/login")
          }
        return ()=>{
          dispatch(reset())
        }
      },[user,navigate,isError,message,dispatch])
// 
    function onSubmit(e){
        e.preventDefault();
        const data=new FormData();
        data.append("text",text)
        data.append("title",title)
        data.append("categoryId",category)
        data.append("imgFile",imgFile)
        dispatch(createBlog(data))
    }
// 
     return (
        <section className="form newBlogForm">
            
               <form  onSubmit={onSubmit} encType="multipart/form-data">
               <div className="form-group new-form-group">
                   <h1>Add new Blog</h1>
                   <input type="text" id="title" name="title" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title of blog"/>
                   <input type="text" id="text" name="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder="Descrp of blog"/>
                   <input type="file" name="imgFile"id="imgFile" onChange={(e)=>setImgFile(e.target.files[0])} />
                   <h1>Where to display blog</h1>
                    <select name="Blogcategory" id="Blogcategory" onChange={(e)=>{setCategory(e.target.value)}}>
                    <option value={1}>Home</option>
                    <option value={2}>Dictionay</option>
                    <option value={3}>Project Health</option>
                    </select>
                </div>
                <div className="form-group">
                <button type="submit" className="btn btn-block" onClick={onSubmit}>Add blog</button>
                </div>
               </form>
          
          
        </section>
    )
}

export default NewBlog