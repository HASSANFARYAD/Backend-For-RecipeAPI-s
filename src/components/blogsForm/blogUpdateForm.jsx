import { useState } from "react";
import {updateBlog} from "../../features/blogs/blogSlice";
import { useDispatch } from "react-redux";
import "./blogUpdate.css";


const Blogupdate = ({blog}) => {
    // console.log(blog)
    const [text,setText]=useState(blog.text);
    const [title,setTitle]=useState(blog.title);
    const [imgFile,setImgFile]=useState()

    const dispatch=useDispatch();

    function onSubmit(e){
        e.preventDefault();
        const dataF=new FormData();
        dataF.append("text",text)
        dataF.append("title",title)
        dataF.append("imgFile",imgFile)
        const data={id:blog._id,data:dataF}
        dispatch(updateBlog(data))
            // setText("")
            // setTitle("")
            // imgFile("")
        
    }

     return (
        <section className="updateformContainer">
            
               <form onSubmit={onSubmit} encType="multipart/form-data" className="updateform">
               <div className="form-group">
                
                <label htmlFor="title">Title of blog</label>
                   <input type="text" id="title" name="title" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title of blog"/>
                   <label htmlFor="imgFile">Image of blog</label>
                   <input type="file" name="imgFile"id="imgFile" onChange={(e)=>setImgFile(e.target.files[0])} />
                
                  
                   <label htmlFor="desc">Description of blog</label>
                   <input type="text" id="desc" name="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder="Descrp of blog"/>
                </div>
                <div className="form-group">
                <button type="submit" className="btn btn-block" onClick={onSubmit}>Update blog</button>
            </div>
               </form>
          
          
        </section>
    )
}

export default Blogupdate