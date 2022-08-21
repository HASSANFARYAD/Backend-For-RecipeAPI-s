import { useState,useEffect } from "react";
import {FaSignInAlt} from "react-icons/fa";
import {useSelector,useDispatch} from "react-redux";
import {useNavigate,Link} from "react-router-dom";
import {toast} from "react-toastify";
import {login,reset} from "../../features/auth/authSlice";
import {authE} from "../../features/authE";
// import Spinner from "../components/Spinner";

const Login = () => {
  const[auth,setAuth]=useState(false);
  const [formData,setformData]=useState({
    email:"",
    password:"",
  })

  const {email,password}=formData;

  const navigate=useNavigate();
  const dispatch=useDispatch();

  const {user,isloading,isSucess,message,isError}=useSelector((state)=>state.auth)
  const {authUser,authAdmin}=useSelector((state)=>state.authE)
  // ....................................................useEffect....................
  console.log(window.location.pathname)
  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(user){
      dispatch(authE())
    }
    if(isSucess || user || authUser || authAdmin){
      setAuth(true)
    }
    if(user && window.location.pathname==="/login"){
      navigate("/newblog")
    }
    // dispatch(authE())
    // dispatch (reset())
  } ,[user,isError,isSucess,message,navigate,dispatch])  

  // ....................................................onChange Function ,called when user change info form..............................
const onChange=(e)=>{
  setformData({...formData,[e.target.name]:e.target.value})
}
  // ....................................................onSubmit function,called when form is submitted...................................
  const onSubmit=(e)=>{
    e.preventDefault();
    const userData ={
      email, password
    }
    dispatch(login(userData))
  }
if(isloading){
  // return <Spinner/>
}
  return (
    <>
      <section className="heading">
        {/* <h1><FaSignInAlt/> Login</h1> */}
      </section>
{user?<p>"you have singned i Sucessfully ,hit cancel to countinue"</p>:
      <section className="form formAuth">
        <h1>Login in to countinue</h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
           <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Enter your email" onChange={onChange}/>
          </div>
          <div className="form-group">
           <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter a password" onChange={onChange}/>
          </div>
          <div className="form-group">
           <button type="submit" className="btn btn-block" onChange={onChange}>Login</button>
          </div>
        </form>  
        {window.location.pathname==="/login"?<Link to="/register">OR create account</Link>:null}    
      </section>}
    </>
  )
}

export default Login