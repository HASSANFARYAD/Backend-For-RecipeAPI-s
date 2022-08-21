import "./home.css";
import {toast} from "react-toastify";
import { useEffect } from "react";
import {FaUserAlt} from "react-icons/fa";
import {BiTimeFive} from "react-icons/bi";
import {CgChevronDoubleRight} from "react-icons/cg";
import {Link} from "react-router-dom";
// import { articleData } from "../../assets/articlesData";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
// import Spinner from "../components/Spinner"
import { getBlogs,reset } from "../../features/blogs/blogSlice";

const Home = () => {

  const navigate=useNavigate();
  const dispatch=useDispatch();

const {blogs,isLoading,isError,message}=useSelector((state)=>state.blogs);

useEffect(()=>{

  dispatch(getBlogs())
  if(isError){
    toast.error(message)
  }
  // console.log("stuck here",message)
  return ()=>{
    dispatch(reset())
  }
},[isError,message,dispatch])

if(blogs){
const blogsLength=blogs.length;
let articleData=[blogs[blogsLength-1],blogs[blogsLength-2],blogs[blogsLength-3]]}

// console.log(articleData)
  return (
    <>
    <div className="home-header">
      <h1>Data as a Second Language® Learn the Art of Data Science</h1>
      <h4>Get access to a Data Science dictionary and the latest news, articles, videos and other educational support resources</h4>
    </div>
    <div className="articles-container">
      <h1>Latest Articles</h1>
      <div className="article-parent"> 
        {blogs.map((blog)=>{
           return(
            <div className="article-card" key={blog.title}>
              <div className="article-card-img-div">
              <img id="article-card-img" src={`images/${blog.image}`} alt="article"/>
              {/* {console.log(blog.image)} */}
              </div>
              <div className="article-des">
                <h1>{blog.title}</h1>
                <div className="article-owner">
                  <FaUserAlt/>
                  <p>{blog.user.name}</p>
                  <span></span>
                  <BiTimeFive/>
                  {new Date(blog.createdAt).toLocaleDateString()}
                  <p></p>
                </div>
                <p>{blog.text.substring(0,100)}</p>
                <div className="article-btn-d">
                <Link to={"/"+blog.title} className="article-btn">Read More<CgChevronDoubleRight className="article-btn-icon"/></Link>
                </div>
              </div>
            </div>
           )
        })}
      </div>
    </div>
    </>
  )
}

export default Home