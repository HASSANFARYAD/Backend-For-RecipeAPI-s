import { useEffect } from "react";
import BlogForm from "../../components/blogsForm/blogform";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
// import Spinner from "../components/Spinner"
import { getBlogs,reset } from "../../features/blogs/blogSlice";
import BlogItem from "../../components/blogsForm/blogArticle";
import {logout} from "../../features/auth/authSlice";
import {toast} from "react-toastify";

const Dashboard = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const {user}=useSelector((state)=>state.auth)
  const {blogs,isLoading,isError,message}=useSelector((state)=>state.blogs);


  useEffect(()=>{

    

    if(isError){
      toast.error(message)
    }
    return ()=>{
      dispatch(reset())
    }
  },[user,navigate,isError,message,dispatch])
  useEffect(()=>{
    if(!user){
      navigate("/login")
    }else{
    dispatch(getBlogs())
    }
  },[])
  if(isLoading){
    // return <Spinner/>
  }
  // console.log(blogs)
// console.log(window.location)

  return (
    <>
      <section className="heading">
        <h1> Welcome {user && user.name}</h1>
        <p>All blogs</p>
      </section>
      <BlogForm />

      <section className="content">
        {blogs.length>0 ? (
          <div className="goals">
            {blogs.map((blog)=>{
              return(
               <div key={blog._id}>
                  <BlogItem  blog={blog} />
              </div>)
            })}
          </div>
        ): (<h3>You have not posted any blog</h3>)}
        <button onClick={()=>{dispatch(logout())}}> LOGOUT</button>
      </section>
    </>
  )
}

export default Dashboard;