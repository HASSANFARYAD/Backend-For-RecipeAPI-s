import { useState } from "react";
import {createBlog} from "../../features/blogs/blogSlice";
import { useDispatch } from "react-redux";


const BlogForm = () => {
    const [text,setText]=useState("");
    const [title,setTitle]=useState("");
    const [imgFile,setImgFile]=useState("")

    const dispatch=useDispatch();

    function onSubmit(e){
        e.preventDefault();
        const data=new FormData();
        data.append("text",text)
        data.append("title",title)
        data.append("imgFile",imgFile)
        dispatch(createBlog(data))
    }

     return (
        <section className="form">
            
               <form onSubmit={onSubmit} encType="multipart/form-data">
               <div className="form-group">
                   <label htmlFor="text">Blog</label>
                   <input type="text" id="title" name="title" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title of blog"/>
                   <input type="text" id="text" name="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder="Descrp of blog"/>
                   <input type="file" name="imgFile"id="imgFile" onChange={(e)=>setImgFile(e.target.files[0])} />
                </div>
                <div className="form-group">
                <button type="submit" className="btn btn-block" onClick={onSubmit}>Add blog</button>
            </div>
               </form>
          
          
        </section>
    )
}

export default BlogForm