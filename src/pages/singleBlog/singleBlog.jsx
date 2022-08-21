import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
// import Spinner from "../components/Spinner"
import { getBlogs,reset } from "../../features/blogs/blogSlice";
import BlogItem from "../../components/blogsForm/blogArticle";
import {logout} from "../../features/auth/authSlice";
import {toast} from "react-toastify";
import "./singleBlog.css"

const Dashboard = () => {
    const[singleBlo,setSinglBlog]=useState(false)
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {user}=useSelector((state)=>state.auth)
  const {blogs,isLoading,isError,message}=useSelector((state)=>state.blogs);


  useEffect(()=>{
    dispatch(getBlogs())
    if(isError){
      toast.error(message)
    }
    return ()=>{
      dispatch(reset())
    }
  },[isError,message,dispatch])

const href=window.location.pathname;
const titlehref=href.substring(href.lastIndexOf('/') + 1);
const singleTitle=titlehref.replaceAll('%20',' ')
// console.log(singleTitle);
// const sin=singleTitle.replaceAll('/','')
const singleBlog=blogs.find((blog,index)=>{
 if(blog.title==singleTitle)
        return blog;
})
useEffect(()=>{
    if(singleBlog && blogs){
    setSinglBlog(true)}else{
        setSinglBlog(false)
    }
},[singleBlog,blogs])

if(isLoading){
    // return <Spinner/>
  }
  // console.log(blogs)
  return (
    <>
      <section className="singleblog-content">
               <div>
                  {singleBlo && blogs?<BlogItem  blog={singleBlog} />:null}
              </div>
      </section>
    </>
  )
}

export default Dashboard;