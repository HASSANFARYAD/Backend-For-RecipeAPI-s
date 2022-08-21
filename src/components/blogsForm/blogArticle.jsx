import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {deleteBlog,updateBlogText} from "../../features/blogs/blogSlice";
import {Link} from "react-router-dom";
import Register from "../../pages/register/register";
import Login from "../../pages/login/login";
import BlogupdateForm from "../../components/blogsForm/blogUpdateForm";
import "./blogArticle.css";
const BlogItem = ({blog}) => {
  const[delteConfirm,setDeleConfirm]=useState(false);
  const[editAuth,setEditAuth]=useState(false);
  const [startEdit,setStartEdit]=useState(false);
  const[authForm,setAuthForm]=useState(true);
  const [textV,setTextV]=useState(blog.text);
  const[blogupdateform,setBlogUpdateForm]=useState(false);
  const {authUser,authAdmin}=useSelector((state)=>state.authE)
  const dispatch=useDispatch();
  const navigate=useNavigate();
   const blogid=blog._id;
  // console.log(blogid)
  return (
    <div className="blogContainer">
        <h1>{blog.title}</h1>
        <img src={`images/${blog.image}`}/>

        {startEdit?
        // edit option for user and admin
        <>
          <input autoFocus="autofocus" type="text" value={textV} onChange={(e)=>{setTextV(e.target.value)}}/>
          <button onClick={()=>{dispatch(updateBlogText({id:blogid,text:textV}));setStartEdit(false);window.location.reload()}}>Update</button>
        </>:
        <>
          <p>{blog.text}</p>
          <button className="close" onClick={()=>{setEditAuth(true);setStartEdit(true)}}>Edit thids blog</button>
        </>}
        <div>
          {/* delete blog option for admin */}
          {authAdmin?<button className="close" onClick={()=>setDeleConfirm(true)}>Delete Blog</button>:null}
          {authAdmin?<button className="updateWholeBtn" onClick={()=>{setBlogUpdateForm(true)}}>Update whole blog</button>:null}
          {blogupdateform?<><BlogupdateForm blog={blog}/><button className="cancelUpdateForm" onClick={()=>{setBlogUpdateForm(false)}}>Cancel</button></>:null}
        </div>
        {delteConfirm?<div className="DeleteWarning">
          <p>ARE YOU SURE TO DELETE THIS BLOG??</p>
          <button onClick={()=>{dispatch(deleteBlog(blogid));setDeleConfirm(false);navigate("/")}}>YES</button>
          <button onClick={()=>{setDeleConfirm(false)}}>Cancel</button>
        </div>:null}
        {}
        {editAuth?
        <div className="editAuth">
          <div>
            <button className="close" onClick={()=>setEditAuth(false)}>Cancel</button>
            <p>Please Register or Login First to edit this blog</p>
            {authForm?
            <>
            <Register/>
            <button onClick={()=>{setAuthForm(false)}}>already registered</button>
            </>:
            <>
            <Login/>
            <button onClick={()=>{setAuthForm(true)}}>Or register</button>
            </>}
            {/* <p>new writer</p> */}
            {/* <Link to="/register">Register</Link> */}
            {/* <p>already registered?</p> */}
          </div>
        </div>:null}
    </div>
  )
}

export default BlogItem;