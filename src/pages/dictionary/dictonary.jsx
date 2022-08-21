import "./dictionary.css";
import {BiTimeFive} from "react-icons/bi";
import {Link} from "react-router-dom";

import { useEffect } from "react";
import BlogForm from "../../components/blogsForm/blogform";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
// import Spinner from "../components/Spinner"
import { getBlogs,reset } from "../../features/blogs/blogSlice";
import BlogItem from "../../components/blogsForm/blogArticle";
import {logout} from "../../features/auth/authSlice";
import {toast} from "react-toastify";

const Dictionary = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const {user}=useSelector((state)=>state.auth)
  const {blogs,isLoading,isError,message}=useSelector((state)=>state.blogs);


  useEffect(()=>{

    
    if(!user){
      console.log("no user")
      navigate("/login")
    }else{
    dispatch(getBlogs())

    }
    if(isError){
      toast.error(message)
    }
    return ()=>{
      dispatch(reset())
    }
  },[user,navigate,isError,message,dispatch])
  
  if(isLoading){
    // return <Spinner/>
  }
  // console.log(Blogs)
console.log(window.location)

  return (
    <>
      <section className="content">
        {blogs.length>0 ? (
          <div className="dictionary-cards-parent">
            {blogs.map((blog)=>{
              if(blog.categoryId == "2"){
              return(
                <Link to={"/"+blog.title} className="Dictionary-card">
               <div  key={blog._id}>
                  <h1>{blog.title}</h1>
                  <div className="Dictionary-card-date">
                  <BiTimeFive/>
                  {new Date(blog.createdAt).toLocaleDateString()}
                  </div>
              </div></Link>)
              }
            })}
          </div>
        ): (<h3>You have not posted any blog</h3>)}
        <button onClick={()=>{dispatch(logout())}}></button>
      </section>
    </>
  )
}

export default Dictionary;