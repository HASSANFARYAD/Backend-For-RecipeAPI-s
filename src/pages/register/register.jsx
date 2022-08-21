import { useState,useEffect } from "react";
import {useSelector,useDispatch} from "react-redux";
import {useNavigate,Link} from "react-router-dom";
import {toast} from "react-toastify";
import { register,reset } from "../../features/auth/authSlice";
import { authE } from "../../features/authE";
// import Spinner from "../components/Spinner";
import {FaUser} from "react-icons/fa";

const Register = () => {
  const[auth,setAuth]=useState(false);
  const [formData,setformData]=useState({
    name:"",
    email:"",
    password:"",
    password2:"",
    person:"user"
  })

  const {name,email,password,password2}=formData;

  const navigate=useNavigate();
  const dispatch=useDispatch();

  const {user,isloading,isSucess,message,isError}=useSelector((state)=>state.auth)
  const {authUser,authAdmin}=useSelector((state)=>state.authE)
  // ....................................................useEffect....................
  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(user){
      dispatch(authE())
    }

    if(isSucess || user || authUser || authAdmin){
      setAuth(true)}
    


    // dispatch (reset())
  } ,[user,isError,isSucess,message,navigate,dispatch])

  // ....................................................onChange Function ,called when user change info form..............................
const onChange=(e)=>{
  setformData({...formData,[e.target.name]:e.target.value})
}
  // ....................................................onSubmit function,called when form is submitted...................................
  const onSubmit=(e)=>{
    e.preventDefault();
    if(password!==password2){
      toast.error("password do not match")
    }else{
      const userData={
        name,
        email,
        password,
        person:"admin"
      }
      dispatch(register(userData))
      // console.log(userData)
    }

    if(isloading){
      // return <Spinner/>
    }
  }


  return (
    <>{user?<p>you have registered suessfully, press cancel to countinue</p>:
    <>
      <section className="heading">
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
           <input type="text" className="form-control" id="name" name="name" value={name} placeholder="Enter your name" onChange={onChange}/>
          </div>
          <div className="form-group">
           <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Enter your email" onChange={onChange}/>
          </div>
          <div className="form-group">
           <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Create a password" onChange={onChange}/>
          </div>
          <div className="form-group">
           <input type="password" className="form-control" id="password2" name="password2" value={password2} placeholder="Confirm your password" onChange={onChange}/>
          </div>
          <div className="form-group">
           <button type="submit" className="btn btn-block" onChange={onChange}>Register</button>
          </div>
        </form>   
        {window.location.pathname==="/register"?<Link to="/login">OR Log IN</Link>:null}       
      </section>
      </>
      }
    </>
  )
}

export default Register